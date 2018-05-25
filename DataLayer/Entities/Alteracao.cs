using System;

namespace DataLayer.Entities
{
    public class Alteracao : BaseEFEntity
    {
        public int Id { get; set; }
        public string NumPedido { get; set; }
        public string PedidosCadados { get; set; }
        public DateTime DataSolicitacao { get; set; }
        public Nullable<DateTime> DataRecebido { get; set; }
        public DateTime DataUltimaAlteracao { get; set; }
        public int SolicitanteId { get; set; }
        public virtual Usuario Solicitante { get; set; }
        public Nullable<int> RecebedorId { get; set; }
        public virtual Usuario Recebedor { get; set; }
        public string FilialDe { get; set; }
        public string FilialPara { get; set; }
        public Nullable<DateTime> HorarioRetiradaDe { get; set; }
        public Nullable<DateTime> HorarioRetiradaPara { get; set; }
        public string EnderecoEntrega { get; set; }
        public string NumRomaneio { get; set; }
        public string Motivo { get; set; }
        public bool Atendida { get; set; }
        public string Observacoes { get; set; }
        public int SetorRequisitante { get; set; }
    }
}
