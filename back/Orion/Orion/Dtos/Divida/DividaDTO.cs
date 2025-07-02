using Orion.Enums;
using System.ComponentModel.DataAnnotations;

namespace Orion.Dtos.Divida
{
    public class DividaDTO
    {
        public decimal Valor { get; set; }
        public Status Situacao { get; set; }
        public DateTime? DataPagamento { get; set; }
        public string Descricao { get; set; }
        public long ClienteId { get; set; }
    }
}
