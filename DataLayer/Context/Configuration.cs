using System.Data.Entity.Migrations;

namespace DataLayer.Context
{
    public class Configuration : DbMigrationsConfiguration<AlterarPedidoDb>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = false;
        }

        protected override void Seed(AlterarPedidoDb context)
        {
            new AlterarPedidoDbSeeder(context).Seed();
        }
    }
}
