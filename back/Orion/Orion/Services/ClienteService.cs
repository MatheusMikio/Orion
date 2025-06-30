using Orion.Dtos;
using Orion.Dtos.Divida;
using Orion.Models;
using Orion.Repository.Interfaces;
using Orion.Services.Interfaces;

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

            IQueryable<ClienteModel> clientesDb =  _repository.GetClientsPage(pagina, tamanho);
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
    }
}
