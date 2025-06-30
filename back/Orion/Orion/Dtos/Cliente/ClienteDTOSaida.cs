using Orion.Dtos.Divida;
using Orion.Models;
using System.ComponentModel.DataAnnotations;

namespace Orion.Dtos
{
    public class ClienteDTOSaida
    {
        public long Id { get; set; }
        [Required]
        public required string Nome { get; set; }
        [Required]
        public required string Cpf { get; set; }
        [Required]
        public required DateTime DataNascimento { get; set; }
        public string ? Email { get; set; }
        public IList<DividaDTOSaida> Dividas { get; set; } = new List<DividaDTOSaida>();
    }
}
