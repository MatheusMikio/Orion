using Orion.Models;

namespace Orion.Repository.Interfaces
{
    public interface IDividaRepository
    {
        public IQueryable<DividaModel> GetDividasPage(int pagina, int tamanho);
        public DividaModel? GetDividaId(long id);
        public IQueryable<DividaModel> Consultar<DividaModel>();
        public void Incluir(DividaModel divida);
        public void Salvar(DividaModel divida);
        public void Excluir(DividaModel divida);
        public IDisposable IniciarTransacao();
        public void Commit();
        public void Rollback();
    }
}
