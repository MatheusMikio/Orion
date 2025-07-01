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

        public List<ClienteDTOSaida> Consultar(string pesquisa)
        {
            IQueryable<ClienteModel> clientesDb = _repository.Consultar<ClienteModel>()
                .Where(c => c.Nome.Contains(pesquisa));
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
            }).ToList();
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

        public ClienteDTOUpdate Editar(ClienteDTOUpdate clienteDTO, out List<MensagemErro> mensagens)
        {
            bool valido = ValidarUpdate(clienteDTO, out mensagens, _repository);
            if (valido)
            {
                ClienteModel clienteDb = _repository.GetClientId(clienteDTO.Id);

                if (clienteDb == null)
                {
                    mensagens.Add(new MensagemErro("Cadastro", "Cliente não encontrado para atualização."));
                    return null;
                }
                clienteDb.Nome = clienteDTO.Nome;
                clienteDb.DataNascimento = clienteDTO.DataNascimento;
                clienteDb.Cpf = clienteDTO.Cpf;
                clienteDb.Email = clienteDTO.Email;
                try
                {
                    using var transacao = _repository.IniciarTransacao();
                    _repository.Salvar(clienteDb);
                    _repository.Commit();
                    return clienteDTO;
                }
                catch (Exception)
                {
                    _repository.Rollback();
                    mensagens.Add(new MensagemErro("Sistema", "Erro inesperado ao atualizar o cliente."));
                    return null;
                }
            }
            return null;
        }

        public ClienteDTOSaida Excluir(long id)
        {
            ClienteModel? clienteDb = _repository.GetClientId(id);
            if (clienteDb == null) return null;
            try
            {
                using var transacao = _repository.IniciarTransacao();
                _repository.Excluir(clienteDb);
                _repository.Commit();
                return new ClienteDTOSaida
                {
                    Id = clienteDb.Id,
                    Nome = clienteDb.Nome,
                    Cpf = clienteDb.Cpf,
                    DataNascimento = clienteDb.DataNascimento,
                    Email = clienteDb.Email,
                    Dividas = clienteDb.Dividas.Select(divida => new DividaDTOSaida
                    {
                        Id = divida.Id,
                        Valor = divida.Valor,
                        Situacao = divida.Situacao,
                        DataPagamento = divida.DataPagamento,
                        Descricao = divida.Descricao
                    }).ToList()
                };
            }
            catch (Exception)
            {
                _repository.Rollback();
                return null;
            }
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

            ClienteModel? clienteDb = _repository.Consultar<ClienteModel>()
                .FirstOrDefault(c => c.Cpf == cliente.Cpf || c.Email == cliente.Email);

            if (clienteDb != null)
            {
                mensagens.Add(new MensagemErro("Cadastro", "Já existe um cliente com esses dados"));
                validation = false;
            }

            return validation;
        }

        public static bool ValidarUpdate(ClienteDTOUpdate cliente, out List<MensagemErro> mensagens, IClienteRepository _repository)
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

            bool userDuplicado = _repository.ValidaClienteUpdate(cliente);

            if (userDuplicado)
            {
                mensagens.Add(new MensagemErro("Cadastro", "Já existe um cliente com esses dados"));
                validation = false;
            }
            return validation;
        }
    }
}
