using Orion.Models;

namespace Orion.Repository.Interfaces
{
    public interface IClienteRepository
    {
        public IQueryable<ClienteModel> GetClientsPage(int pagina, int tamanho);
    }
}
