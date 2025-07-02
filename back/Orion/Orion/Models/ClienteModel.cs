using Orion.Dtos.Cliente;
using System.ComponentModel.DataAnnotations;

namespace Orion.Models
{
    public class ClienteModel
    {
        public long Id { get; set; }
        [Required]
        [RegularExpression(@"^[A-Z][a-zA-Z\s]+$", ErrorMessage = "Nome inválido. Deve começar com letra maiúscula e conter apenas letras e espaços.")]
        public string Nome { get; set; }
        [Required]
        [RegularExpression(@"^(?!^(\d)\1{10}$)\d{11}$)", ErrorMessage = "CPF inválido. Deve conter 11 dígitos e não pode ser uma sequência repetida.")]
        public  string Cpf { get; set; }
        [Required]
        public DateTime DataNascimento { get; set; }
        [RegularExpression(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", ErrorMessage = "E-mail inválido.")]
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
        public IList<DividaModel> Dividas { get; set; } = new List<DividaModel>();

        public ClienteModel(ClienteDTO cliente)
        {
            Nome = cliente.Nome;
            DataNascimento = cliente.DataNascimento;
            Email = cliente.Email;
        }

        public ClienteModel()
        {
        }
    }
}
