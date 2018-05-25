using Elmah;
using LinqKit;
using Microsoft.AspNet.SignalR;
using ServiceLayer.AlteracaoServices;
using Swashbuckle.Swagger.Annotations;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WebApi.Helpers;
using WebApi.Hubs;
using WebApi.Models;

namespace WebApi.Controllers
{
    [RoutePrefix("api/alteracoes")]
    [System.Web.Http.Authorize]
    public class AlteracoesController : ApiController
    {
        private IAlteracaoService Service;
        private IHubContext Hubs;

        public AlteracoesController(IAlteracaoService _service)
        {
            Hubs = GlobalHost.ConnectionManager.GetHubContext<DashboardAtendenteHub>();
            Service = _service;
            Service.UsuarioLogado = Helper.UsuarioLogado;
        }

        /// <summary>
        /// Buscar uma Alteração de Pedido
        /// </summary>
        /// <remarks>Busca uma Alteração de Pedido no sistema pelo ID da mesma</remarks>
        /// <param name="alteracaoId">Id da Alteração de Pedido a ser retornada</param>
        [HttpGet]
        [Route("{alteracaoId:int}", Name = "GetAlteracao")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(AlteracaoDto))]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public async Task<IHttpActionResult> Get(int alteracaoId)
        {
            try
            {
                var alteracao = await Service.Get(alteracaoId);
                return Ok<AlteracaoDto>(alteracao);
            }
            catch (NullReferenceException)
            {
                return NotFound();
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// Buscar Alterações de pedidos aguardando atendimento
        /// </summary>
        [HttpGet]
        [Route("aguardando")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(IEnumerable<AlteracaoDto>))]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public async Task<IHttpActionResult> GetAguardandoAtendimento()
        {
            try
            {
                var alteracoes = await Service.GetAll().Where(d => d.DataRecebido == null).ToListAsync();
                return Ok<IEnumerable<AlteracaoDto>>(alteracoes);
            }
            catch (NullReferenceException)
            {
                return NotFound();
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// Buscar Alterações de pedidos aguardando finalização
        /// </summary>
        [HttpGet]
        [Route("aguardandoFinalizacao")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(IEnumerable<AlteracaoDto>))]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public async Task<IHttpActionResult> GetAguardandoFinalizacao()
        {
            try
            {
                var alteracoes = await Service.GetAll().Where(d => d.Atendida == false && d.DataRecebido != null).ToListAsync();
                return Ok<IEnumerable<AlteracaoDto>>(alteracoes);
            }
            catch (NullReferenceException)
            {
                return NotFound();
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// Buscar Alterações de Pedidos
        /// </summary>
        /// <param name="DataDe">Data de início da pesquisa</param>
        /// <param name="DataAte">Data final da pesquisa</param>
        /// <param name="NumPedido">Número do  pedido para pesquisa</param>
        /// <param name="SolicitanteId">Id do solicitante para pesquisa</param>
        [HttpPost]
        [Route("buscar", Name = "BuscarAlteracoes")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(IEnumerable<AlteracaoDto>))]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public async Task<IHttpActionResult> BuscarAlteracoes([FromBody] ParametrosBuscarAlteracao parametros)
        {
            var de = Convert.ToDateTime(parametros.DataDe);
            var ate = Convert.ToDateTime(parametros.DataAte).AddHours(23);

            var predicate = PredicateBuilder.New<AlteracaoDto>();
            predicate.And(r => r.DataSolicitacao >= de);
            predicate.And(r => r.DataSolicitacao <= ate);

            if (!string.IsNullOrEmpty(parametros.NumPedido))
            {
                predicate.And(d => d.NumPedido.Contains(parametros.NumPedido) || d.PedidosCadados.Contains(parametros.NumPedido));
            }

            if (parametros.SolicitanteId != 1)
            {
                predicate.And(d => d.SolicitanteId == parametros.SolicitanteId);
            }

            if (parametros.SetorRequisitante != 0)
            {
                predicate.And(d => d.SetorRequisitante == parametros.SetorRequisitante);
            }

            if (!string.IsNullOrEmpty(parametros.FilialDe) && parametros.FilialDe != "Todas")
            {
                predicate.And(d => d.FilialDe == parametros.FilialDe);
            }

            if (!string.IsNullOrEmpty(parametros.FilialPara) && parametros.FilialPara != "Todas")
            {
                predicate.And(d => d.FilialPara == parametros.FilialPara);
            }

            var alteracoes = await Service.GetAll()
                    .AsExpandable()
                    .Where(predicate)
                    .ToListAsync();

            return Ok<IEnumerable<AlteracaoDto>>(alteracoes);
        }

        /// <summary>
        /// Buscar Alterações de Pedidos Por Setor
        /// </summary>
        /// <param name="DataDe">Data de início da pesquisa</param>
        /// <param name="DataAte">Data final da pesquisa</param>
        [HttpPost]
        [Route("buscarDashboard", Name = "BuscarDashboard")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(DashboardModel))]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public async Task<IHttpActionResult> BuscarDashboard([FromBody] ParametrosBuscarAlteracao parametros)
        {
            var de = Convert.ToDateTime(parametros.DataDe);
            var ate = Convert.ToDateTime(parametros.DataAte).AddHours(23);

            var setores = await Service.GetAll()
                .Where(a => a.DataSolicitacao >= de && a.DataSolicitacao <= ate)
                .GroupBy(a => a.SetorRequisitante)
                .Select(group => new AlteracoesPorSetor { SetorRequisitante = group.Key, Quantidade = group.Count() })
                .ToListAsync();

            var atendentes = await Service.GetAll()
                .Where(a => a.DataSolicitacao >= de && a.DataSolicitacao <= ate)
                .GroupBy(a => a.SolicitanteNome)
                .Select(group => new AlteracoesPorAtendente { SolicitanteNome = group.Key, Quantidade = group.Count() })
                .ToListAsync();

            var dashboard = new DashboardModel();
            dashboard.AlteracoesPorAtendentes = atendentes;
            dashboard.AlteracoesPorSetor = setores;

            return Ok<DashboardModel>(dashboard);
        }
        
        /// <summary>
        /// Adicionar uma alteração de pedido
        /// </summary>
        /// <remarks>Adiciona uma nova alteração pelo modelo enviado no corpo da solicitação</remarks>
        /// <param name="alteracaoDto">Dados da alteração a ser adicionada</param>
        [Route("")]
        [SwaggerResponse(HttpStatusCode.Created, Type = typeof(AlteracaoDto))]
        [SwaggerResponse(HttpStatusCode.BadRequest)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public async Task<IHttpActionResult> Post([FromBody] AlteracaoDto alteracaoDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Existem dados obrigatórios faltando.");
            }

            try
            {
                if (alteracaoDto == null) return BadRequest("Erro ao converter a alteração do Body");
                alteracaoDto.DataSolicitacao = DateTime.Now;
                alteracaoDto.DataUltimaAlteracao = DateTime.Now;
                if (alteracaoDto.HorarioRetiradaDe != null)
                {
                    DateTime utc = DateTime.UtcNow;
                    TimeZoneInfo zone = TimeZoneInfo.Local;
                    DateTime localDateTime = TimeZoneInfo.ConvertTimeFromUtc(utc, zone);
                    var horas = zone.GetUtcOffset(localDateTime).TotalHours;
                    alteracaoDto.HorarioRetiradaDe = alteracaoDto.HorarioRetiradaDe.Value.AddHours(horas);
                    alteracaoDto.HorarioRetiradaPara = alteracaoDto.HorarioRetiradaPara.Value.AddHours(horas);
                }

                var criado = await Service.Create(alteracaoDto);
                Hubs.Clients.All.novaAlteracaoIncluida();
                return Created<AlteracaoDto>(new Uri(Url.Link("GetAlteracao", new { alteracaoId = criado.Id })), criado);
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                return InternalServerError(ex);
            }
        }

        [AllowAnonymous]
        [Route("teste")]
        [HttpGet]
        public async Task<IHttpActionResult> Teste()
        {
            Hubs.Clients.All.novaAlteracaoIncluida();
            return Ok();
        }

        /// <summary>
        /// Editar uma alteração de pedido
        /// </summary>
        /// <remarks>Salva as alterações enviadas no corpo da requisição na alteração de pedido informado no ID</remarks>
        /// <param name="alteracaoId">Id da alteração a ser editada</param>
        /// <param name="alteracaoDto">Dados da alteração a ser atualizada</param>
        [HttpPatch]
        [HttpPut]
        [Route("{alteracaoId:int}")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(AlteracaoDto))]
        [SwaggerResponse(HttpStatusCode.NotModified)]
        [SwaggerResponse(HttpStatusCode.BadRequest)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public async Task<IHttpActionResult> Put(int alteracaoId, [FromBody] AlteracaoDto alteracaoDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Existem dados obrigatórios faltando.");
                }

                if (alteracaoDto == null) return BadRequest("Erro ao converter a alteração do Body");

                if (await Service.Update(alteracaoId, alteracaoDto))
                {
                    return Ok<AlteracaoDto>(alteracaoDto);
                }
                else
                {
                    return ResponseMessage(Request.CreateResponse(HttpStatusCode.NotModified, "Alteração não modificado."));
                }
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// Marca uma alteração como recebida
        /// </summary>
        /// <param name="alteracaoId">Id da alteração a ser editada</param>
        /// <param name="recebedorId">Id do recebedor da alteração</param>
        [HttpPatch]
        [HttpPut]
        [Route("{alteracaoId:int}/recebedor/{recebedorId:int}")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(AlteracaoDto))]
        [SwaggerResponse(HttpStatusCode.NotModified)]
        [SwaggerResponse(HttpStatusCode.BadRequest)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public async Task<IHttpActionResult> ReceberAlteracao(int alteracaoId, int recebedorId)
        {
            try
            {
                if (alteracaoId == 0)
                {
                    return BadRequest("AlteracaoId não pode ser nulo.");
                }

                if (recebedorId == 0)
                {
                    return BadRequest("RecebedorId não pode ser nulo.");
                }
                var alteracao = await Service.ReceberAlteracao(alteracaoId, recebedorId);
                return Ok<AlteracaoDto>(alteracao);
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// Altera as observações de uma alteração do pedido
        /// </summary>
        /// <param name="alteracaoId">Id da alteração a ser editada</param>
        /// <param name="Observacoes">String com as observações</param>
        [HttpPatch]
        [HttpPut]
        [Route("{alteracaoId:int}/observacoes")]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public async Task<IHttpActionResult> UpdateObservacoes(int alteracaoId, [FromBody] AlteracaoUpdateObservacoes parametros)
        {
            try
            {


                if (alteracaoId == 0)
                {
                    return BadRequest("AlteracaoId não pode ser nulo.");
                }

                await Service.UpdateObservacoes(alteracaoId, parametros.Observacoes);
                return Ok();
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// Deletar uma alteração de pedido
        /// </summary>
        /// <remarks>Deleta a alteração de pedido informado no ID</remarks>
        /// <param name="alteracaoId">Id da alteração de pedido a ser deletada</param>
        [Route("{alteracaoId:int}")]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public async Task<IHttpActionResult> Delete(int alteracaoId)
        {
            try
            {
                if (await Service.Delete(alteracaoId))
                {
                    return Ok();
                }
                return NotFound();
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                return InternalServerError(ex);
            }
        }
    }
}
