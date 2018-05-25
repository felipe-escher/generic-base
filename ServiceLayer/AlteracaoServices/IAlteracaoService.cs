using ServiceLayer.Core;
using System.Threading.Tasks;

namespace ServiceLayer.AlteracaoServices
{
    public interface IAlteracaoService : IBaseService<AlteracaoDto>
    {
        Task<AlteracaoDto> ReceberAlteracao(int alteracaoId, int recebedorId);
        Task UpdateObservacoes(int alteracaoId, string observacoes);
    }
}
