using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Orion.Dtos.Cliente;
using Orion.Models;
using Orion.Services.Interfaces;

namespace Orion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly IClienteService _clienteService;

        public ClienteController(IClienteService clienteService)
        {
            _clienteService = clienteService;
        }
        [HttpGet]
        public IActionResult GetClientsPage([FromQuery] int  pagina = 1, [FromQuery]int tamanho = 10)
        {
            if (pagina < 1 || tamanho < 1) return BadRequest("Os parâmetros 'pagina' e 'tamanho' devem ser maiores que zero.");
            
            return Ok(_clienteService.GetClientsPage(pagina, tamanho));
        }

        [HttpPost]
        public IActionResult CreateClient([FromBody] ClienteDTO clienteDTO)
        {
            if (_clienteService.AddCliente(clienteDTO, out List<MensagemErro> erros)) return Ok(clienteDTO);

            return UnprocessableEntity(erros);
        }
    }
}
