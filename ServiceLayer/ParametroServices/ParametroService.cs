using AutoMapper;
using DataLayer.Entities;
using ServiceLayer.Core;
using System.Threading.Tasks;

namespace ServiceLayer.ParametroServices
{
    public class ParametroService : GenericBase<Parametro, ParametroDto>, IParametroService
    {
        public ParametroService(IMapper mapper) : base(mapper) { }

        public async Task<bool> Update(int parametroId, ParametroDto parametroDto)
        {
            var parametroOriginal = await base.GetEntity(parametroId);
            var parametroAtualizado = this.mapper.Map<ParametroDto, Parametro>(parametroDto);
            parametroAtualizado.Id = parametroId;
            if (parametroOriginal.Nome == parametroAtualizado.Nome && parametroOriginal.Argumento == parametroAtualizado.Argumento
                    && parametroOriginal.SubArgumento == parametroAtualizado.SubArgumento
                    && parametroOriginal.Descricao == parametroAtualizado.Descricao)
            {
                return false;
            }
            await base.Update(parametroOriginal, parametroAtualizado);
            return true;
        }
    }
}
