using Orion.Dtos;
using Orion.Dtos.Cliente;
using Orion.Models;

namespace Orion.Services.Interfaces
{
    public interface IClienteService
    {
        public IQueryable<ClienteDTOSaida> GetClientsPage(int pagina, int tamanho);
        public bool AddCliente(ClienteDTO clienteDTO, out List<MensagemErro> mensagens);
        public ClienteDTO Editar(ClienteDTO clienteDTO, out List<MensagemErro> mensagens);
    }
}
