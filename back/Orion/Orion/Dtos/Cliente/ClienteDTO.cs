using System.ComponentModel.DataAnnotations;

namespace Orion.Dtos.Cliente
{
    public class ClienteDTO
    {

        [Required(ErrorMessage = "O nome é obrigatório.")]
        [RegularExpression(@"^[A-Z][a-zA-Z\s]+$", ErrorMessage = "Nome inválido. Deve começar com letra maiúscula e conter apenas letras e espaços.")]
        public required string Nome { get; set; }

        [Required(ErrorMessage = "O CPF é obrigatório.")]
        [RegularExpression(@"^(?!^(\d)\1{2}\.\1{3}\.\1{3}-\1{2}$)\d{3}\.\d{3}\.\d{3}-\d{2}$", ErrorMessage = "CPF inválido. Deve estar no formato 000.000.000-00 e não pode ser uma sequência repetida.")]
        public required string Cpf { get; set; }


        [Required(ErrorMessage = "A data de nascimento é obrigatória.")]
        public required DateTime DataNascimento { get; set; }

        [EmailAddress(ErrorMessage = "E-mail inválido.")]
        [RegularExpression(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", ErrorMessage = "Formato de e-mail inválido.")]

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
