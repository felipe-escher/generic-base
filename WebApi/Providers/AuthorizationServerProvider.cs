using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using ServiceLayer.TokenServices;
using ServiceLayer.UsuarioServices;
using System.Collections.Generic;
using System.DirectoryServices;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Threading.Tasks;
using WebApi.Helpers;

namespace WebApi.Providers
{
    public class AuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        ITokenService service = StructureMapConfig.ObjectFactory.Container.GetInstance<ITokenService>();

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            string clientId = string.Empty;
            string clientSecret = string.Empty;
            ClientDto client = null;

            if (!context.TryGetBasicCredentials(out clientId, out clientSecret))
            {
                context.TryGetFormCredentials(out clientId, out clientSecret);
            }

            if (context.ClientId == null)
            {
                context.SetError("invalid_clientId", "O id de client deve ser enviado.");
                return Task.FromResult<object>(null);
            }

            client = service.FindClient(context.ClientId);

            if (client == null)
            {
                context.SetError("invalid_clientId", string.Format("Client '{0}' não está registrado no sistema.", context.ClientId));
                return Task.FromResult<object>(null);
            }

            if (client.TipoAplicacao == TiposAplicacao.NativaConfidencial)
            {
                if (string.IsNullOrWhiteSpace(clientSecret))
                {
                    context.SetError("invalid_clientId", "Client secret deve ser enviado.");
                    return Task.FromResult<object>(null);
                }
                else
                {
                    if (client.Secret != Helper.GetHash(clientSecret))
                    {
                        context.SetError("invalid_clientId", "Client secret Inválido.");
                        return Task.FromResult<object>(null);
                    }
                }
            }

            if (!client.Ativo)
            {
                context.SetError("invalid_clientId", "Client não está ativado.");
                return Task.FromResult<object>(null);
            }

            context.OwinContext.Set<string>("as:clientAllowedOrigin", client.AllowedOrigin);
            context.OwinContext.Set<string>("as:clientRefreshTokenLifeTime", client.RefreshTokenLifeTime.ToString());

            context.Validated();
            return Task.FromResult<object>(null);
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var container = StructureMapConfig.ObjectFactory.Container;
            var origemPermitida = context.OwinContext.Get<string>("as:clientAllowedOrigin");
            if (origemPermitida == null) origemPermitida = "*";
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { origemPermitida });

            string Usuario = "PHITOFORMULAS\\" + context.UserName;
            string Senha = context.Password;
            SearchResult Resultado;
            var colab = new UsuarioDto();

            try
            {
                if (context.UserName == "administrador")
                {
                    colab = this.service.LoginAdministrador(context.Password);
                    if (colab == null)
                    {
                        context.SetError("invalid_grant", "O usuário ou senha estão incorretos");
                        return;
                    }
                }
                else
                {
                    DirectoryEntry entry = new DirectoryEntry("LDAP://ad.phito.com.br/DC=ad,DC=phito,DC=com,DC=br", Usuario, Senha);
                    DirectorySearcher ds = new DirectorySearcher(entry);
                    ds.Filter = "(&(objectClass=user)(|(cn=" + context.UserName + ")(sAMAccountName=" + context.UserName + ")))";
                    ds.PropertiesToLoad.Add("mail");
                    Resultado = ds.FindOne();

                    if (Resultado == null)
                    {
                        context.SetError("invalid_grant", "O usuário ou senha estão incorretos");
                        return;
                    }

                    DirectoryEntry adObject = Resultado.GetDirectoryEntry();
                    string nome = adObject.Name.Replace("CN=", "");
                    string email = adObject.Properties["mail"][0].ToString();
                    var usuarioService = container.GetInstance<IUsuarioService>();
                    colab = usuarioService.GetSync(adObject.NativeGuid);

                    if (colab == null)
                    {
                        UsuarioDto addUsuario = new UsuarioDto()
                        {
                            GUID = adObject.NativeGuid,
                            Login = context.UserName,
                            Nome = nome,
                            Permissoes = "[]",
                            Email = email,
                            Ativo = true
                        };
                        await usuarioService.Create(addUsuario);
                        colab = usuarioService.GetSync(adObject.NativeGuid);
                    }
                }
            }
            catch (DirectoryServicesCOMException ex)
            {
                context.SetError("invalid_grant", ex.Message);
                return;
            }
            catch (COMException ex)
            {
                context.SetError("invalid_grant", ex.Message);
                return;
            }

            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            identity.AddClaim(new Claim(ClaimTypes.Name, context.UserName));
            identity.AddClaim(new Claim(ClaimsAlterar.UsuarioId, colab.Id.ToString()));

            var props = new AuthenticationProperties(new Dictionary<string, string>
                {
                    {
                        "as:client_id", (context.ClientId == null) ? string.Empty : context.ClientId
                    },
                    {
                        "userId", colab.Id.ToString()
                    },
                    {
                        "userLogin", context.UserName
                    },
                    {
                        "userName", colab.Nome
                    },
                    {
                        "permissoes", colab.Permissoes
                    }
                });

            var ticket = new AuthenticationTicket(identity, props);
            context.Validated(ticket);
            return;
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }
            return Task.FromResult(0);
        }

        public override Task GrantRefreshToken(OAuthGrantRefreshTokenContext context)
        {
            var originalClient = context.Ticket.Properties.Dictionary["as:client_id"];
            var currentClient = context.ClientId;

            if (originalClient != currentClient)
            {
                context.SetError("invalid_clientId", "Refresh token foi gerado para um id de client diferente.");
                return Task.FromResult<object>(null);
            }

            // Change auth ticket for refresh token requests
            var newIdentity = new ClaimsIdentity(context.Ticket.Identity);

            var newTicket = new AuthenticationTicket(newIdentity, context.Ticket.Properties);
            context.Validated(newTicket);

            return Task.FromResult<object>(null);
        }
    }
}