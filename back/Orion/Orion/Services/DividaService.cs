using Orion.Dtos.Cliente;
using Orion.Dtos.Divida;
using Orion.Enums;
using Orion.Models;
using Orion.Repository.Interfaces;
using Orion.Services.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Orion.Services
{
    public class DividaService : IDividaService
    {
        private readonly IDividaRepository _dividaRepository;
        private readonly IClienteRepository _clienteRepository;

        public DividaService(IDividaRepository dividaRepository, IClienteRepository clienteRepository)
        {
            _dividaRepository = dividaRepository;
            _clienteRepository = clienteRepository;
        }
        public IQueryable<DividaDTOSaida> GetDividasPage(int pagina, int tamanho)
        {
            IQueryable<DividaModel> dividas = _dividaRepository.GetDividasPage(pagina, tamanho);
            return dividas.Select(divida => new DividaDTOSaida
            {
                Id = divida.Id,
                Valor = divida.Valor,
                Situacao = divida.Situacao,
                DataPagamento = divida.DataPagamento,
                Descricao = divida.Descricao,
            });
        }

        public bool AddDivida(DividaDTO dividaDTO, out List<MensagemErro> erros)
        {
            bool valido = Validar(dividaDTO, out erros, _dividaRepository, _clienteRepository);
            if (valido)
            {
                try {
                    ClienteModel cliente = _clienteRepository.GetClientId(dividaDTO.ClienteId);

                    if (cliente == null)
                    {
                        erros.Add(new MensagemErro("Cliente", "Cliente não encontrado."));
                        return false;
                    }

                    DividaModel divida = new()
                    {
                        Valor = dividaDTO.Valor,
                        Situacao = Status.Pendente,
                        DataPagamento = null,
                        Descricao = dividaDTO.Descricao,
                        Cliente = cliente
                    };
                    using var transacao = _dividaRepository.IniciarTransacao();
                    _dividaRepository.Incluir(divida);
                    _dividaRepository.Commit();
                    return true;
                }
                catch (Exception)
                {
                    erros.Add(new MensagemErro("Sistema", "Erro inesperado ao salvar a dívida."));
                    return false;
                }
                
            }
            return false;
        }

        public static bool Validar(DividaDTO divida, out List<MensagemErro> mensagens, IDividaRepository dividarepository, IClienteRepository clienteRepository)
        {
            ValidationContext validationContext = new(divida);
            List<ValidationResult> erros = new();
            bool validation = Validator.TryValidateObject(divida, validationContext, erros, true);

            ClienteModel cliente = clienteRepository.GetClientId(divida.ClienteId);

            mensagens = new List<MensagemErro>();
            foreach (ValidationResult erro in erros)
            {
                MensagemErro mensagem = new(
                    erro.MemberNames.First(),
                    erro.ErrorMessage
                );
                mensagens.Add(mensagem);
            }

            if (cliente == null)
            {
                mensagens.Add(new MensagemErro("Cliente", "Cliente não encontrado."));
                validation = false;
            }

            if (string.IsNullOrEmpty(divida.Descricao))
            {
                mensagens.Add(new MensagemErro("Descrição", "A descrição da dívida é obrigatório."));
                validation = false;
            }

            if (divida.Valor > 200 || divida.Valor  <= 0)
            {
                mensagens.Add(new MensagemErro("Valor", "O valor da dívida tem que ser maior que R$0,00 e menor que R$200,00"));
                validation = false;
            }
            if (cliente?.Dividas.Where(d => d.Situacao == Status.Pendente).Sum(d => d.Valor) + divida.Valor > 200)
            {
                mensagens.Add(new MensagemErro("Cliente", "A soma das dividas abertas não pode ultrapassar R$200,00"));
                validation = false;
            }
            return validation;
        }

    }
}
