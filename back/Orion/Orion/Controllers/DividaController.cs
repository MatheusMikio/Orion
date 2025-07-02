using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Orion.Dtos;
using Orion.Dtos.Divida;
using Orion.Models;
using Orion.Services;
using Orion.Services.Interfaces;

namespace Orion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DividaController : ControllerBase
    {
        private readonly IDividaService _dividaService;
        public DividaController(IDividaService dividaService)
        {
            _dividaService = dividaService;
        }
        [HttpGet]
        public IActionResult GetDividasPage([FromQuery] int pagina = 1, [FromQuery] int tamanho = 10)
        {
            if (pagina < 1 || tamanho < 1) return BadRequest("Os parâmetros 'pagina' e 'tamanho' devem ser maiores que zero.");

            return  Ok(_dividaService.GetDividasPage(pagina, tamanho));
        }

        [HttpPost]
        public IActionResult CreateDivida([FromBody] DividaDTO dividaDTO)
        {
            if (_dividaService.AddDivida(dividaDTO, out List<MensagemErro> erros)) return CreatedAtAction(nameof(CreateDivida), dividaDTO);

            return UnprocessableEntity(erros);
        }

        [HttpPut]
        public IActionResult Put([FromBody] DividaDTOUpdate divida)
        {
            DividaDTOSaida dividaAtualizada = _dividaService.UpdateDivida(divida, out List<MensagemErro> erros);

            if (dividaAtualizada == null) return UnprocessableEntity(erros);

            return Ok(dividaAtualizada);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            DividaDTOSaida ? divida= _dividaService.Excluir(id);

            if (divida == null) return NotFound("Cliente não encontrado.");

            return Ok(divida);
        }
    }
}
