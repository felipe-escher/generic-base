using DataLayer.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace DataLayer.Mappers
{
    internal sealed class ParametroMapper : EntityTypeConfiguration<Parametro>
    {
        public ParametroMapper()
        {
            this.ToTable("Parametros");

            this.HasKey(p => p.Id);
            this.Property(p => p.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            this.Property(p => p.Id).IsRequired();

            this.Property(p => p.Nome).IsRequired();
            this.Property(p => p.Nome).HasMaxLength(255);

            this.Property(p => p.Argumento).IsRequired();
            this.Property(p => p.Argumento).HasMaxLength(255);

            this.Property(p => p.SubArgumento).IsOptional();
            this.Property(p => p.SubArgumento).HasMaxLength(255);

            this.Property(p => p.Descricao).IsOptional();
            this.Property(p => p.Descricao).HasMaxLength(255);
        }
    }
}
