using Orion.Dtos.Divida;
using Orion.Models;
using System.ComponentModel.DataAnnotations;

namespace Orion.Dtos
{
    public class  ClienteDTOSaida
    {
        public long Id { get; set; }
        public string Nome { get; set; }
        public  string Cpf { get; set; }
        public DateTime DataNascimento { get; set; }
        public string ? Email { get; set; }
        public IList<DividaDTOSaida> Dividas { get; set; } = new List<DividaDTOSaida>();
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
