using DataLayer.Entities;
using DataLayer.Mappers;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace DataLayer.Context
{
    public class AlterarPedidoDb : DbContext
    {
        public AlterarPedidoDb(): base("AlterarPedidoDbConn")
        {
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = true;
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<AlterarPedidoDb, Configuration>());
        }

        public DbSet<Alteracao> Alteracoes { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Log> Logs { get; set; }
        public DbSet<Parametro> Parametros { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            modelBuilder.Configurations.Add(new AlteracaoMapper());
            modelBuilder.Configurations.Add(new ClientMapper());
            modelBuilder.Configurations.Add(new LogMapper());
            modelBuilder.Configurations.Add(new ParametroMapper());
            modelBuilder.Configurations.Add(new RefreshTokenMapper());
            modelBuilder.Configurations.Add(new UsuariosMapper());

            base.OnModelCreating(modelBuilder);
        }
    }
}
