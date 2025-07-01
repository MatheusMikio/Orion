using System.ComponentModel.DataAnnotations;

namespace Orion.Dtos.Cliente
{
    public class ClienteDTO
    {
        [Required]
        public required string Nome { get; set; }
        [Required]
        public required string Cpf { get; set; }
        [Required]
        public required DateTime DataNascimento { get; set; }
        public string ? Email { get; set; }
        public int Idade
        {
            get
            {
                int anoAtual = DateTime.Today.Year;
                int idade = anoAtual - DataNascimento.Year;
                DateTime aniversario = DateTime.Today.AddYears(-idade);
                if (DataNascimento > aniversario) idade--;
                return idade;
            }
        }
    }
}
