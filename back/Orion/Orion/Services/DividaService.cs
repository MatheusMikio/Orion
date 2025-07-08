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

        public DividaDTOSaida GetDividaId(long id)
        {
            DividaModel? divida = _dividaRepository.GetDividaId(id);

            if (divida == null) return null;

            return new DividaDTOSaida
            {
                Id = divida.Id,
                Valor = divida.Valor,
                Situacao = divida.Situacao,
                DataPagamento = divida.DataPagamento,
                Descricao = divida.Descricao
            };
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
                        Situacao = dividaDTO.Situacao,
                        DataPagamento = dividaDTO.DataPagamento,
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

        public DividaDTOSaida UpdateDivida(DividaDTOUpdate divida, out List<MensagemErro> erros)
        {
            bool valido = Validar(divida, out erros, _dividaRepository, _clienteRepository);

            if (valido)
            {
                DividaModel ? dividaModel = _dividaRepository.GetDividaId(divida.Id);
                if (dividaModel == null)
                {
                    erros.Add(new MensagemErro("Divida", "Dívida não encontrada."));
                    return null;
                }
                dividaModel.Valor = divida.Valor;
                dividaModel.Descricao = divida.Descricao;
                dividaModel.DataPagamento = divida.DataPagamento;
                dividaModel.Situacao = divida.Situacao;
                try
                {
                    using var transacao = _dividaRepository.IniciarTransacao();
                    _dividaRepository.Salvar(dividaModel);
                    _dividaRepository.Commit();
                    return new DividaDTOSaida
                    {
                        Id = dividaModel.Id,
                        Valor = dividaModel.Valor,
                        Situacao = dividaModel.Situacao,
                        DataPagamento = dividaModel.DataPagamento,
                        Descricao = dividaModel.Descricao
                    };
                }
                catch (Exception)
                {
                    erros.Add(new MensagemErro("Sistema", "Erro inesperado ao atualizar a dívida."));
                    return null;
                }
            }
            return null;
        }

        public DividaDTOSaida Excluir(long id)
        {
            DividaModel ? dividaDb = _dividaRepository.GetDividaId(id);
            if (dividaDb == null) return null;
            try
            {
                using var transacao = _dividaRepository.IniciarTransacao();
                _dividaRepository.Excluir(dividaDb);
                _dividaRepository.Commit();
                return new DividaDTOSaida
                {
                    Id = dividaDb.Id,
                    Valor = dividaDb.Valor,
                    Situacao = dividaDb.Situacao,
                    DataPagamento = dividaDb.DataPagamento,
                    Descricao = dividaDb.Descricao
                };
            }
            catch (Exception)
            {
                _dividaRepository.Rollback();
                return null;
            }
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
                return validation;
            }

            if (string.IsNullOrEmpty(divida.Descricao))
            {
                mensagens.Add(new MensagemErro("Descrição", "A descrição da dívida é obrigatório."));
                validation = false;
                return validation;
            }

            if (divida.Valor > 200 || divida.Valor  <= 0)
            {
                mensagens.Add(new MensagemErro("Valor", "O valor da dívida tem que ser maior que R$0,00 e menor que R$200,00"));
                validation = false;
            }

            if (divida.Situacao == Status.Pago)
            {
                if (divida.DataPagamento == null) 
                {
                    mensagens.Add(new MensagemErro("DataPagamento", "A data de pagamento é obrigatória quando a dívida está paga."));
                    validation = false;
                }

                if (divida.DataPagamento > DateTime.Now)
                {
                    mensagens.Add(new MensagemErro("DataPagamento", "A data de pagamento não pode ser futura."));
                    validation = false;
                }
            }
            else
            {
                if (cliente.Dividas.Where(d => d.Situacao == Status.Pendente).Sum(d => d.Valor) + divida.Valor > 200)
                {
                    mensagens.Add(new MensagemErro("Cliente", "A soma das dividas abertas não pode ultrapassar R$200,00"));
                    validation = false;
                }
            }

           
            return validation;
        }
        public static bool Validar(DividaDTOUpdate divida, out List<MensagemErro> mensagens, IDividaRepository dividarepository, IClienteRepository clienteRepository)
        {
            ValidationContext validationContext = new(divida);
            List<ValidationResult> erros = new();
            bool validation = Validator.TryValidateObject(divida, validationContext, erros, true);

            ClienteModel cliente = clienteRepository.GetClientId(divida.ClienteId);
            DividaModel ? dividaExistente = dividarepository.GetDividaId(divida.Id);

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
                return validation;
            }

            if (dividaExistente == null)
            {
                mensagens.Add(new MensagemErro("Divida", "Dívida não encontrada."));
                validation = false;
                return validation;
            }

            if (string.IsNullOrEmpty(divida.Descricao))
            {
                mensagens.Add(new MensagemErro("Descrição", "A descrição da dívida é obrigatório."));
                validation = false;
            }

            if (divida.Valor > 200 || divida.Valor <= 0)
            {
                mensagens.Add(new MensagemErro("Valor", "O valor da dívida tem que ser maior que R$0,00 e menor que R$200,00"));
                validation = false;
            }
            ;
            if (cliente.Dividas.Where(d => d.Situacao == Status.Pendente && d.Id != divida.Id).Sum(d => d.Valor) + divida.Valor > 200)
            {
                mensagens.Add(new MensagemErro("Cliente", "A soma das dividas abertas não pode ultrapassar R$200,00"));
                validation = false;
            }

            return validation;
        }
    }

}
