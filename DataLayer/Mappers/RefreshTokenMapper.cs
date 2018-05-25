using DataLayer.Entities;
using System.Data.Entity.ModelConfiguration;

namespace DataLayer.Mappers
{
    internal sealed class RefreshTokenMapper : EntityTypeConfiguration<RefreshToken>
    {
        public RefreshTokenMapper()
        {
            this.ToTable("RefreshTokens");

            this.HasKey(x => x.Id);
            this.Property(x => x.Id).IsRequired();

            this.Property(x => x.Subject).IsRequired();
            this.Property(x => x.Subject).HasMaxLength(100);

            this.Property(x => x.ClientId).IsRequired();
            this.Property(x => x.ClientId).HasMaxLength(50);

            this.Property(x => x.ProtectedTicket).IsRequired();
        }
    }
}
