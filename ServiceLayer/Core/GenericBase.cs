using AutoMapper;
using AutoMapper.QueryableExtensions;
using DataLayer.Context;
using DataLayer.Entities;
using ServiceLayer.Helpers;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceLayer.Core
{
    public abstract class GenericBase<TEntity, TDto> : IGenericBase 
        where TEntity : BaseEFEntity
        where TDto : BaseDto
    {
        private AlterarPedidoDb _db = new AlterarPedidoDb();
        private IMapper _mapper;

        public string UsuarioLogado { get; set; }
        public string LogDadosAntigos { get; set; }

        public GenericBase(IMapper mapper)
        {
            this._mapper = mapper;
        }

        protected AlterarPedidoDb db
        {
            get
            {
                return _db;
            }
        }

        protected IMapper mapper
        {
            get
            {
                return _mapper;
            }
        }

        protected void AtivarLog()
        {
            _db.Database.Log = s => System.Diagnostics.Debug.WriteLine(s);
        }

        protected async Task<TEntity> GetEntity(int id)
        {
            var entity = await this.db.Set<TEntity>().FindAsync(id);
            if (entity == null)
            {
                throw new NullReferenceException(typeof(TEntity).Name + " não localizado");
            }

            return await this.db.Set<TEntity>().FindAsync(id);
        }

        public async Task<TDto> Get(int id)
        {
            var entity = await this.db.Set<TEntity>().FindAsync(id);
            if (entity == null)
            {
                throw new NullReferenceException(typeof(TEntity).Name + " não localizado");
            }
            return mapper.Map<TEntity, TDto>(entity);
        }

        public IQueryable<TDto> GetAll()
        {
            return this.db.Set<TEntity>().ProjectTo<TDto>(mapper.ConfigurationProvider);
        }

        public async Task<TDto> Create(TDto entityTdo)
        {
            var entity = mapper.Map<TDto, TEntity>(entityTdo);
            this.db.Set<TEntity>().Add(entity);
            var log = Helper.LogUsuario(this.UsuarioLogado, typeof(TEntity).Name, "Criar",
                typeof(TEntity).Name + " criado com sucesso.", "", Helper.ConverterJson(entity));
            this.db.Logs.Add(log);
            await this.db.SaveChangesAsync();
            return mapper.Map<TEntity, TDto>(entity);
        }

        public async Task Update(TEntity entity, TEntity entityAtualizada)
        {
            this.LogDadosAntigos = Helper.ConverterJson(entity);
            this.db.Entry(entity).CurrentValues.SetValues(entityAtualizada);
            var log = Helper.LogUsuario(this.UsuarioLogado, typeof(TEntity).Name, "Atualizar",
                typeof(TEntity).Name + " atualizado com sucesso.", this.LogDadosAntigos, Helper.ConverterJson(entityAtualizada));
            this.db.Logs.Add(log);
            await this.db.SaveChangesAsync();
        }

        public async Task<bool> Delete(int id)
        {
            var entity = await this.GetEntity(id);
            this.LogDadosAntigos = Helper.ConverterJson(entity);
            this.db.Set<TEntity>().Remove(entity);
            var log = Helper.LogUsuario(this.UsuarioLogado, typeof(TEntity).Name, "Deletar",
                typeof(TEntity).Name + " removido com sucesso.", this.LogDadosAntigos);
            this.db.Logs.Add(log);
            await this.db.SaveChangesAsync();
            return true;
        }
    }
}
