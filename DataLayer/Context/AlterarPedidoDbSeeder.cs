using DataLayer.Entities;
using System.Collections.Generic;
using System.Linq;

namespace DataLayer.Context
{
    public class AlterarPedidoDbSeeder
    {
        AlterarPedidoDb context;

        public AlterarPedidoDbSeeder(AlterarPedidoDb ctx)
        {
            context = ctx;
        }

        public void Seed()
        {
            #region Clients
            var clients = new List<Client>
            {
                new Client
                {
                    Id = "alterarpedido-app",
                    Secret = "12345segredo",
                    Nome = "App Angular Aterar Pedidos",
                    TipoAplicacao = TiposAplicacao.Javascript,
                    Ativo = true,
                    RefreshTokenLifeTime = 120,
                    AllowedOrigin = "*"
                }
            };
            if (context.Clients.Count() < 1)
            {
                clients.ForEach(x => context.Clients.Add(x));
                context.SaveChanges();
            }
            #endregion

            #region Usuarios
            var usuarios = new List<Usuario>
            {
                new Usuario
                {
                    GUID = "1",
                    Login = "admin",
                    Nome = "Administrador",
                    Permissoes = "[1,2,3]"
                }
            };

            if (context.Usuarios.Count() < 1)
            {
                usuarios.ForEach(x => context.Usuarios.Add(x));
                context.SaveChanges();
            }
            #endregion

            #region Parametros
            var parametros = new List<Parametro>
            {
                new Parametro
                {
                    Nome = "Teste",
                    Argumento = "2",
                    Descricao = "Teste Seed"
                }
            };
            if (context.Parametros.Count() < 1)
            {
                parametros.ForEach(x => context.Parametros.Add(x));
                context.SaveChanges();
            }
            #endregion
        }
    }
}
