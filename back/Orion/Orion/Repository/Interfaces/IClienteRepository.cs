using Orion.Dtos;
using Orion.Dtos.Cliente;
using Orion.Models;

namespace Orion.Repository.Interfaces
{
    public interface IClienteRepository
    {
        public IQueryable<ClienteModel> GetClientsPage(int pagina, int tamanho);
        public IQueryable<ClienteModel> GetClients();
        public void Incluir(ClienteModel cliente);
        public void Salvar(ClienteModel cliente);
        public bool ValidaClienteUpdate(ClienteDTOUpdate cliente);
        public void Excluir(ClienteModel cliente);
        public ClienteModel GetClientId(long id);
        
        IQueryable<ClienteModel> Consultar<ClienteModel>();
        public IDisposable IniciarTransacao();
        public void Commit();
        public void Rollback();
    }
}
