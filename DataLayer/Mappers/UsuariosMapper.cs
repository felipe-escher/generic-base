using DataLayer.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace DataLayer.Mappers
{
    internal sealed class UsuariosMapper : EntityTypeConfiguration<Usuario>
    {
        public UsuariosMapper()
        {
            this.ToTable("Usuarios");

            this.HasKey(x => x.Id);
            this.Property(x => x.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            this.Property(x => x.Id).IsRequired();

            this.Property(x => x.GUID).IsRequired();
            this.Property(x => x.Nome).IsRequired();
            this.Property(x => x.Permissoes).IsRequired();
            this.Property(x => x.Email).IsOptional();
            this.Property(x => x.ConnectionId).IsOptional();
        }
    }
}
