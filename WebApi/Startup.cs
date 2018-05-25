using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using System.Web.Http;
using WebApi.Providers;
using Swashbuckle.Application;

[assembly: OwinStartup(typeof(WebApi.Startup))]

namespace WebApi
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration config = new HttpConfiguration();
            ConfigureOAuth(app);
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            app.MapSignalR();
            app.UseWebApi(config);
            WebApiConfig.Register(config);
            var xmlCommentsPath = string.Format(@"{0}bin\WebApi.XML", AppDomain.CurrentDomain.BaseDirectory);
            config.EnableSwagger(c =>
            {
                c.SingleApiVersion("v1", "AlteracaoPedidos.WebAPI");
                c.IncludeXmlComments(xmlCommentsPath);
            }).EnableSwaggerUi();
        }

        /// <summary>
        /// Configura o OAuth
        /// </summary>
        /// <param name="app">A apliacção</param>
        public void ConfigureOAuth(IAppBuilder app)
        {
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions { });
        }
    }
}
