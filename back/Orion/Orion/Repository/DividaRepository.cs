using NHibernate;
using Orion.Models;
using Orion.Repository.Interfaces;

namespace Orion.Repository
{
    public class DividaRepository : IDividaRepository
    {
        private readonly ISessionFactory _sessionFactory;
        private readonly NHibernate.ISession _session;
        public DividaRepository(ISessionFactory sessionFactory)
        {
            _sessionFactory = sessionFactory;
            _session = sessionFactory.OpenSession();
        }
        public IQueryable<DividaModel> GetDividasPage(int pagina, int tamanho) => _session.Query<DividaModel>()
           .OrderByDescending(x => x.Valor)
           .Skip((pagina - 1) * tamanho)
           .Take(tamanho);

        public DividaModel ? GetDividaId(long id) => _session.Query<DividaModel>().FirstOrDefault(d => d.Id == id);

        public IQueryable<DividaModel> Consultar<DividaModel>() => _session.Query<DividaModel>();

        public void Incluir(DividaModel divida) => _session.Save(divida);

        public void Salvar(DividaModel divida) => _session.Merge(divida);

        public void Excluir(DividaModel divida) => _session.Delete(divida);


        public IDisposable IniciarTransacao()
        {
            var transaction = _session.BeginTransaction();
            return transaction;
        }
        public void Rollback() => _session.GetCurrentTransaction()?.Rollback();
        public void Commit() => _session.GetCurrentTransaction().Commit();
    }
}