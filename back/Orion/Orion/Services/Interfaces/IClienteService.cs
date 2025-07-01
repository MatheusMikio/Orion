using Orion.Dtos;
using Orion.Dtos.Cliente;
using Orion.Models;

namespace Orion.Services.Interfaces
{
    public interface IClienteService
    {
        public IQueryable<ClienteDTOSaida> GetClientsPage(int pagina, int tamanho);
        public List<ClienteDTOSaida> Consultar(string pesquisa);
        public bool AddCliente(ClienteDTO clienteDTO, out List<MensagemErro> mensagens);
        public ClienteDTOUpdate Editar(ClienteDTOUpdate clienteDTO, out List<MensagemErro> mensagens);
        public ClienteDTOSaida? Excluir(long id);
    }
}
