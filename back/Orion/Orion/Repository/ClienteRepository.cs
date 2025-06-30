using NHibernate;
using NHibernate.Linq;
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
            .Skip((pagina - 1) * tamanho)
            .Take(tamanho);
            
    }
}
