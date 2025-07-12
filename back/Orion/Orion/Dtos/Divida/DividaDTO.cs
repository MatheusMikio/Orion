using Orion.Enums;
using System.ComponentModel.DataAnnotations;

namespace Orion.Dtos.Divida
{
    public class DividaDTO
    {
        public decimal Valor { get; set; }
        public string Descricao { get; set; }
        public long ClienteId { get; set; }
    }
}
