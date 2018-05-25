using AutoMapper;
using DataLayer.Entities;
using ServiceLayer.AlteracaoServices;
using ServiceLayer.ParametroServices;
using ServiceLayer.TokenServices;
using ServiceLayer.UsuarioServices;

namespace ServiceLayer.Helpers
{
    public class ServiceLayerAutoMapperProfile : Profile
    {
        public ServiceLayerAutoMapperProfile()
        {
            CreateMap<Alteracao, AlteracaoDto>();
            CreateMap<AlteracaoDto, Alteracao>();

            CreateMap<Parametro, ParametroDto>();
            CreateMap<ParametroDto, Parametro>();

            CreateMap<RefreshToken, TokenDto>();
            CreateMap<TokenDto, RefreshToken>();
            CreateMap<Client, ClientDto>();

            CreateMap<Usuario, UsuarioDto>();
            CreateMap<UsuarioDto, Usuario>();
        }
    }
}
