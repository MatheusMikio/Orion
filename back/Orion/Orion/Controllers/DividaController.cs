using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Orion.Dtos.Divida;
using Orion.Models;
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
    }
}
