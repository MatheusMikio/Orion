using System.ComponentModel.DataAnnotations;

namespace Orion.Dtos.Cliente
{
    public class ClienteDTO
    {
        public long Id { get; set; }
        [Required]
        public required string Nome { get; set; }
        [Required]
        public required string Cpf { get; set; }
        [Required]
        public required DateTime DataNascimento { get; set; }
        public string ? Email { get; set; }
    }
}
