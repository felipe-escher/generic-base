using ServiceLayer.AlteracaoServices;
using ServiceLayer.ParametroServices;
using ServiceLayer.TokenServices;
using ServiceLayer.UsuarioServices;
using StructureMap;

namespace ServiceLayer.StructureMapRegistry
{
    public class ServiceLayerRegistry : Registry
    {
        public ServiceLayerRegistry()
        {
            For<IAlteracaoService>().Use<AlteracaoService>();
            For<IParametroService>().Use<ParametroService>();
            For<ITokenService>().Use<TokenService>();
            For<IUsuarioService>().Use<UsuarioService>();
        }
    }
}
