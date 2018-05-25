using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class ParametrosBuscarAlteracao
    {
        [Required]
        public string DataDe { get; set; }

        [Required]
        public string DataAte { get; set; }

        public string NumPedido { get; set; }
        public int SolicitanteId { get; set; }
        public int SetorRequisitante { get; set; }
        public string FilialDe { get; set; }
        public string FilialPara { get; set; }
    }
}