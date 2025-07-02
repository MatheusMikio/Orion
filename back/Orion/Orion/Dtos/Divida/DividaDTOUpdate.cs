using Orion.Enums;

namespace Orion.Dtos.Divida
{
    public class DividaDTOUpdate
    {
        public long Id { get; set; }
        public decimal Valor { get; set; }
        public Status Situacao { get; set; }
        public DateTime ? DataPagamento { get; set; }
        public required string Descricao { get; set; }
        public long ClienteId { get; set; }
    }
}
