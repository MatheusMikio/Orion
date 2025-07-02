using Orion.Dtos.Divida;
using Orion.Models;

namespace Orion.Services.Interfaces
{
    public interface IDividaService
    {
        IQueryable<DividaDTOSaida> GetDividasPage(int pagina, int tamanho);
        bool AddDivida(DividaDTO dividaDTO, out List<MensagemErro> erros);

        DividaDTOSaida UpdateDivida(DividaDTOUpdate divida, out List<MensagemErro> erros);
        public DividaDTOSaida Excluir(long id);
    }
}
