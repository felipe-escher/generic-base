using DataLayer.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace DataLayer.Mappers
{
    internal sealed class LogMapper : EntityTypeConfiguration<Log>
    {
        public LogMapper()
        {
            this.ToTable("Logs");

            this.HasKey(l => l.Id);
            this.Property(l => l.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            this.Property(l => l.Id).IsRequired();

            this.Property(l => l.NomeUsuario).IsRequired();
            this.Property(l => l.NomeUsuario).HasMaxLength(150);

            this.Property(l => l.DataHora).IsRequired();

            this.Property(l => l.Modulo).IsRequired();
            this.Property(l => l.Modulo).HasMaxLength(100);

            this.Property(l => l.Acao).IsRequired();
            this.Property(l => l.Acao).HasMaxLength(200);

            this.Property(l => l.Mensagem).IsRequired();

            this.Property(l => l.DadosAntigos).IsOptional();

            this.Property(l => l.DadosNovos).IsOptional();
        }
    }
}
