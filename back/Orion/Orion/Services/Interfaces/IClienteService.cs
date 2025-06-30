using Orion.Dtos;
using Orion.Models;

namespace Orion.Services.Interfaces
{
    public interface IClienteService
    {
        public IQueryable<ClienteDTOSaida> GetClientsPage(int pagina, int tamanho);
    }
}
