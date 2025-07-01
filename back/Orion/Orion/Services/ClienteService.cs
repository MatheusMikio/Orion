using Orion.Dtos;
using Orion.Dtos.Cliente;
using Orion.Dtos.Divida;
using Orion.Models;
using Orion.Repository.Interfaces;
using Orion.Services.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Orion.Services
{
    public class ClienteService : IClienteService
    {
        private readonly IClienteRepository _repository;
        public ClienteService(IClienteRepository clienteRepository)
        {
            _repository = clienteRepository;
        }

        public IQueryable<ClienteDTOSaida> GetClientsPage(int pagina, int tamanho)
        {

            IQueryable<ClienteModel> clientesDb = _repository.GetClientsPage(pagina, tamanho);
            return clientesDb.Select(cliente => new ClienteDTOSaida
            {
                Id = cliente.Id,
                Nome = cliente.Nome,
                Cpf = cliente.Cpf,
                DataNascimento = cliente.DataNascimento,
                Email = cliente.Email,
                Dividas = cliente.Dividas.Select(divida => new DividaDTOSaida
                {
                    Id = divida.Id,
                    Valor = divida.Valor,
                    Situacao = divida.Situacao,
                    DataPagamento = divida.DataPagamento,
                    Descricao = divida.Descricao
                }).ToList()
            });
        }

        public bool AddCliente(ClienteDTO clienteDTO, out List<MensagemErro> mensagens)
        {
            bool valido = Validar(clienteDTO, out mensagens, _repository);

            if (valido)
            {
                try
                {
                    ClienteModel cliente = new(clienteDTO);
                    _repository.IniciarTransacao();
                    _repository.Incluir(cliente);
                    _repository.Commit();
                    return true;
                }
                catch (Exception)
                {
                    _repository.Rollback();
                    mensagens.Add(new MensagemErro("Sistema", "Erro inesperado ao salvar o cliente."));
                    return false;
                }
            }
            return false;
        }



        public static bool Validar(ClienteDTO cliente, out List<MensagemErro> mensagens, IClienteRepository _repository)
        {
            ValidationContext validationContext = new(cliente);
            List<ValidationResult> erros = new();
            bool validation = Validator.TryValidateObject(cliente, validationContext, erros, true);

            mensagens = new List<MensagemErro>();
            foreach (ValidationResult erro in erros)
            {
                MensagemErro mensagem = new(
                    erro.MemberNames.First(),
                    erro.ErrorMessage
                );
                mensagens.Add(mensagem);
            }

            if (cliente.Idade < 18)
            {
                mensagens.Add(new MensagemErro("DataNascimento", "O cliente deve ser maior de idade (18 anos)."));
                validation = false;
            }

            ClienteModel ? clienteDb = _repository.Consultar<ClienteModel>()
                .FirstOrDefault(c => c.Cpf == cliente.Cpf || c.Email == cliente.Email);

            if (clienteDb != null)
            {
                mensagens.Add(new MensagemErro("Cadastro","Já existe um cliente com esses dados"));
                validation = false;
            }

            return validation;
        }
    }
}
