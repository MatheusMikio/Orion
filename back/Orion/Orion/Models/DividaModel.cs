using Orion.Enums;
using System.ComponentModel.DataAnnotations;

namespace Orion.Models
{
    public class DividaModel
    {
        public long Id { get; set; }
        public decimal Valor { get; set; }
        public Status Situacao { get; set; }
        public DateTime ? DataPagamento { get; set; }
        [Required]
        public required string Descricao { get; set; }
        [Required]
        public required ClienteModel Cliente { get; set; }

        public DividaModel()
        {
        }
    }

    }
