using Microsoft.AspNet.SignalR;
using ServiceLayer.UsuarioServices;
using System;
using System.Threading.Tasks;

namespace WebApi.Hubs
{
    public class DashboardAtendenteHub : Hub
    {
        private IUsuarioService Service = StructureMapConfig.ObjectFactory.Container.GetInstance<IUsuarioService>();

        public void NovaAlteracao()
        {
            Clients.All.novaAlteracaoIncluida();
        }

        public async override Task OnConnected()
        {
            var userId = Convert.ToInt32(Context.QueryString["userId"]);
            var usuario = await Service.Get(userId);
            usuario.ConnectionId = Context.ConnectionId;
            await Service.Update(usuario.Id, usuario);
            await base.OnConnected();
        }

        public async override Task OnDisconnected(bool stopCalled)
        {
            var userId = Convert.ToInt32(Context.QueryString["userId"]);
            var usuario = await Service.Get(userId);
            usuario.ConnectionId = null;
            await Service.Update(usuario.Id, usuario);
            await base.OnDisconnected(stopCalled);
        }

        public async override Task OnReconnected()
        {
            var userId = Convert.ToInt32(Context.QueryString["userId"]);
            var usuario = await Service.Get(userId);
            usuario.ConnectionId = Context.ConnectionId;
            await Service.Update(usuario.Id, usuario);
            await base.OnReconnected();
        }
    }
}