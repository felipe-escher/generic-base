using DataLayer.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace DataLayer.Mappers
{
    internal sealed class AlteracaoMapper : EntityTypeConfiguration<Alteracao>
    {
        public AlteracaoMapper()
        {
            ToTable("Alteracoes");

            HasKey(x => x.Id);
            Property(x => x.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            Property(x => x.Id).IsRequired();

            Property(x => x.NumPedido).IsRequired();
            Property(x => x.PedidosCadados).IsOptional();
            Property(x => x.DataSolicitacao).IsRequired();
            Property(x => x.DataUltimaAlteracao).IsRequired();
            Property(x => x.DataRecebido).IsOptional();
            Property(x => x.FilialDe).IsOptional();
            Property(x => x.FilialDe).HasMaxLength(200);
            Property(x => x.FilialPara).IsOptional();
            Property(x => x.FilialPara).HasMaxLength(200);
            Property(x => x.HorarioRetiradaDe).IsOptional();
            Property(x => x.HorarioRetiradaPara).IsOptional();
            Property(x => x.EnderecoEntrega).IsOptional();
            Property(x => x.NumRomaneio).IsOptional();
            Property(x => x.Motivo).IsRequired();
            Property(x => x.Atendida).IsRequired();
            Property(x => x.SetorRequisitante).IsRequired();
            Property(x => x.Observacoes ).IsOptional();

            HasRequired(x => x.Solicitante).WithMany().HasForeignKey(x => x.SolicitanteId).WillCascadeOnDelete(false);
            HasOptional(x => x.Recebedor).WithMany().HasForeignKey(x => x.RecebedorId).WillCascadeOnDelete(false);
        }
    }
}
