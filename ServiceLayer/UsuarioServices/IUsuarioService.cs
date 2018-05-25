using ServiceLayer.Core;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ServiceLayer.UsuarioServices
{
    public interface IUsuarioService : IBaseService<UsuarioDto>
    {
        Task<UsuarioDto> Get(string GUID);
        UsuarioDto GetSync(string GUID);
        IEnumerable<UsuarioADDto> BuscarUsuariosAD();
    }
}
