using AutoMapper;
using DataLayer.Entities;
using ServiceLayer.Core;
using System;
using System.Threading.Tasks;
using System.Data.Entity;

namespace ServiceLayer.AlteracaoServices
{
    public class AlteracaoService : GenericBase<Alteracao, AlteracaoDto>, IAlteracaoService
    {
        public AlteracaoService(IMapper mapper) : base(mapper) { }

        private async Task<Alteracao> GetAlteracao(int alteracaoId)
        {
            return await db.Alteracoes
                                    .Include(a => a.Solicitante)
                                    .Include(a => a.Recebedor)
                                    .FirstOrDefaultAsync(a => a.Id == alteracaoId);
        }

        public async new Task<AlteracaoDto> Get(int alteracaoId)
        {
            var alteracao = await GetAlteracao(alteracaoId);
            return mapper.Map<Alteracao, AlteracaoDto>(alteracao);
        }

        public async Task<bool> Update(int alteracaoId, AlteracaoDto alteracaoDto)
        {
            var alteracaoOriginal = await GetEntity(alteracaoId);
            var alteracaoAtualizada = mapper.Map<AlteracaoDto, Alteracao>(alteracaoDto);
            alteracaoAtualizada.Id = alteracaoId;
            alteracaoAtualizada.DataUltimaAlteracao = DateTime.Now;
            if (alteracaoOriginal.Motivo == alteracaoAtualizada.Motivo && alteracaoOriginal.EnderecoEntrega == alteracaoAtualizada.EnderecoEntrega
                && alteracaoOriginal.FilialDe == alteracaoAtualizada.FilialDe
                && alteracaoOriginal.FilialPara == alteracaoAtualizada.FilialPara
                && alteracaoOriginal.HorarioRetiradaDe == alteracaoAtualizada.HorarioRetiradaDe
                && alteracaoOriginal.Atendida == alteracaoAtualizada.Atendida
                && alteracaoOriginal.RecebedorId == alteracaoAtualizada.RecebedorId
                && alteracaoOriginal.Observacoes == alteracaoAtualizada.Observacoes)
            {
                return false;
            }
            await Update(alteracaoOriginal, alteracaoAtualizada);
            return true;
        }

        public async Task<AlteracaoDto> ReceberAlteracao(int alteracaoId, int recebedorId)
        {
            var alteracao = await Get(alteracaoId);
            alteracao.DataRecebido = DateTime.Now;
            alteracao.RecebedorId = recebedorId;
            await Update(alteracaoId, alteracao);
            return await Get(alteracaoId);
        }

        public async Task UpdateObservacoes(int alteracaoId, string observacoes)
        {
            var alteracao = await Get(alteracaoId);
            alteracao.DataUltimaAlteracao = DateTime.Now;
            alteracao.Observacoes = observacoes;
            await Update(alteracaoId, alteracao);
        }
    }
}
