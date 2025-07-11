using NHibernate;
using NHibernate.Linq;
using Orion.Dtos;
using Orion.Dtos.Cliente;
using Orion.Models;
using Orion.Repository.Interfaces;
using System.Linq;

namespace Orion.Repository
{
    public class ClienteRepository : IClienteRepository
    {
        private readonly ISessionFactory _sessionFactory;
        private readonly NHibernate.ISession _session;

        public ClienteRepository(ISessionFactory sessionFactory)
        {
            _sessionFactory = sessionFactory;
            _session = sessionFactory.OpenSession();
        }
        public IQueryable<ClienteModel> GetClientsPage(int pagina, int tamanho) => _session.Query<ClienteModel>()
            .OrderByDescending(x => x.Dividas.Any())
            .ThenByDescending(x => x.Dividas.Sum(d => d.Valor))
            .Skip((pagina - 1) * tamanho)
            .Take(tamanho);

        public IQueryable<ClienteModel> GetClients() => _session.Query<ClienteModel>()
            .OrderBy(cliente => cliente.Nome);


        public ClienteModel ? GetClientId(long id) =>_session.Query<ClienteModel>().FirstOrDefault(cliente => cliente.Id == id);

        public IQueryable<ClienteModel> Consultar<ClienteModel>() => _session.Query<ClienteModel>();

        public void Incluir(ClienteModel cliente) => _session.Save(cliente);

        public void Salvar(ClienteModel cliente) => _session.Merge(cliente);

        public void Excluir(ClienteModel cliente) => _session.Delete(cliente);


        public bool ValidaClienteUpdate(ClienteDTOUpdate cliente) => _session.Query<ClienteModel>()
            .Any(c => (c.Cpf == cliente.Cpf || c.Email == cliente.Email) && c.Id != cliente.Id);


        public IDisposable IniciarTransacao()
        {
            var transaction = _session.BeginTransaction();
            return transaction;
        }
        public void Rollback() => _session.GetCurrentTransaction()?.Rollback();
        public void Commit() => _session.GetCurrentTransaction().Commit();
    }
}
