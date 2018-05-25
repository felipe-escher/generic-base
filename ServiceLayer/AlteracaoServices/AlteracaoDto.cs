using ServiceLayer.Core;
using System;
using System.ComponentModel.DataAnnotations;

namespace ServiceLayer.AlteracaoServices
{
    public class AlteracaoDto : BaseDto
    {
        public int Id { get; set; }

        [Required]
        public string NumPedido { get; set; }
        public string PedidosCadados { get; set; }
        public DateTime DataSolicitacao { get; set; }
        public Nullable<DateTime> DataRecebido { get; set; }
        public DateTime DataUltimaAlteracao { get; set; }

        [Required]
        public int SolicitanteId { get; set; }
        public string SolicitanteNome { get; set; }
        public Nullable<int> RecebedorId { get; set; }
        public string RecebedorNome { get; set; }

        [MaxLength(200)]
        public string FilialDe { get; set; }

        [MaxLength(200)]
        public string FilialPara { get; set; }
        public Nullable<DateTime> HorarioRetiradaDe { get; set; }
        public Nullable<DateTime> HorarioRetiradaPara { get; set; }
        public string EnderecoEntrega { get; set; }
        public string NumRomaneio { get; set; }

        [Required]
        public string Motivo { get; set; }
        public bool Atendida { get; set; }

        [Required]
        public int SetorRequisitante { get; set; }
        public string Observacoes { get; set; }

        public AlteracaoDto()
        {
            Atendida = false;
        }
    }
}
