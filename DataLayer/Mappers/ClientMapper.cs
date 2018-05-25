using DataLayer.Entities;
using System.Data.Entity.ModelConfiguration;

namespace DataLayer.Mappers
{
    internal sealed class ClientMapper : EntityTypeConfiguration<Client>
    {
        public ClientMapper()
        {
            this.ToTable("Clients");

            this.HasKey(x => x.Id);
            this.Property(x => x.Id).IsRequired();

            this.Property(x => x.Secret).IsRequired();

            this.Property(x => x.Nome).IsRequired();
            this.Property(x => x.Nome).HasMaxLength(100);

            this.Property(x => x.AllowedOrigin).HasMaxLength(100);
        }
    }
}
