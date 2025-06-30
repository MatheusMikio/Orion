using Orion.Enums;
using System.ComponentModel.DataAnnotations;

namespace Orion.Dtos.Divida
{
    public class DividaDTOSaida
    {
        public long Id { get; set; }
        public decimal Valor { get; set; }
        public Status Situacao { get; set; }
        public DateTime? DataPagamento { get; set; }
        [Required]
        public required string Descricao { get; set; }
    }
}
