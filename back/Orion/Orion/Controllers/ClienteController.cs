using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Orion.Dtos;
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
        public IActionResult GetClientsPage([FromQuery] int  pagina = 1, [FromQuery]int tamanho = 10, string pesquisa = null)
        {
            if (pagina < 1 || tamanho < 1) return BadRequest("Os parâmetros 'pagina' e 'tamanho' devem ser maiores que zero.");

            return string.IsNullOrEmpty(pesquisa) ? Ok(_clienteService.GetClientsPage(pagina, tamanho)) : Ok(_clienteService.Consultar(pesquisa));

        }

        [HttpGet("{id}")]
        public IActionResult GetClientId(long id)
        {
            ClienteDTOSaida? cliente = _clienteService.GetClienteId(id);

            if (cliente == null) return NotFound("Cliente não encontrado.");

            return Ok(cliente);
        }

        [HttpPost]
        public IActionResult CreateClient([FromBody] ClienteDTO clienteDTO)
        {
            if (_clienteService.AddCliente(clienteDTO, out List<MensagemErro> erros)) return CreatedAtAction(nameof(CreateClient), clienteDTO);

            return UnprocessableEntity(erros);
        }

        [HttpPut]
        public IActionResult Put([FromBody] ClienteDTOUpdate clienteDTO)
        {
            ClienteDTOUpdate resultado = _clienteService.Editar(clienteDTO, out List<MensagemErro> erros);

            if (resultado == null) return UnprocessableEntity(erros);
   
            return Ok(resultado);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            ClienteDTOSaida ? cliente = _clienteService.Excluir(id);

            if (cliente == null) return NotFound("Cliente não encontrado.");

            return Ok(cliente);
        }
    }
}
