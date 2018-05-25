using System.Linq;
using System.Threading.Tasks;

namespace ServiceLayer.Core
{
    public interface IBaseService<TEntity> where TEntity : class
    {
        string LogDadosAntigos { get; set; }
        string UsuarioLogado { get; set; }

        Task<TEntity> Get(int id);
        IQueryable<TEntity> GetAll();
        Task<TEntity> Create(TEntity entity);
        Task<bool> Update(int id, TEntity entity);
        Task<bool> Delete(int id);
    }
}
