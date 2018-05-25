using Elmah;
using ServiceLayer.ParametroServices;
using Swashbuckle.Swagger.Annotations;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WebApi.Helpers;

namespace WebApi.Controllers
{
    [RoutePrefix("api/parametros")]
    [Authorize]
    public class ParametrosController : ApiController
    {
        private IParametroService Service;

        public ParametrosController(IParametroService _service)
        {
            this.Service = _service;
            this.Service.UsuarioLogado = Helper.UsuarioLogado;
        }

        /// <summary>
        /// Buscar todos os parâmetros
        /// </summary>
        /// <remarks>Busca uma lista dos parâmetros cadastrados</remarks>
        [Route("", Name = "Parametros")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(List<ParametroDto>))]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public async Task<IHttpActionResult> Get()
        {
            try
            {
                var parametros = await Service.GetAll().ToListAsync();
                return Ok<IEnumerable<ParametroDto>>(parametros);
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// Buscar um parâmetro
        /// </summary>
        /// <remarks>Busca um parâmetro no sistema pelo ID do mesmo</remarks>
        /// <param name="parametroId">Id do parâmetro a ser retornado</param>
        [HttpGet]
        [Route("{parametroId:int}", Name = "Parametro")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(ParametroDto))]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public async Task<IHttpActionResult> Get(int parametroId)
        {
            try
            {
                var parametro = await Service.Get(parametroId);
                if (parametro != null)
                {
                    return Ok<ParametroDto>(parametro);
                }
                return NotFound();
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// Adicionar um parâmetro
        /// </summary>
        /// <remarks>Adiciona um novo parâmetro pelo modelo enviado no corpo da solicitação</remarks>
        /// <param name="parametro">Dados do parâmetro a ser adicionado</param>
        [Route("")]
        [SwaggerResponse(HttpStatusCode.Created, Type = typeof(ParametroDto))]
        [SwaggerResponse(HttpStatusCode.BadRequest)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public async Task<IHttpActionResult> Post([FromBody] ParametroDto parametro)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Existem dados obrigatórios faltando.");
            }

            try
            {
                if (parametro == null) return BadRequest("Erro ao converter o parâmetro do Body");
                var criado = await Service.Create(parametro);
                return Created<ParametroDto>(new Uri(Url.Link("Parametro", new { parametroId = criado.Id })), criado);
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// Editar um parâmetro
        /// </summary>
        /// <remarks>Salva as alterações enviadas no corpo da requisição no parâmetro informado no ID</remarks>
        /// <param name="parametroId">Id do parâmetro a ser editado</param>
        /// <param name="parametroDto">Dados do parâmetro a ser atualizado</param>
        [HttpPatch]
        [HttpPut]
        [Route("{parametroId:int}")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(ParametroDto))]
        [SwaggerResponse(HttpStatusCode.NotModified)]
        [SwaggerResponse(HttpStatusCode.BadRequest)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public async Task<IHttpActionResult> Put(int parametroId, [FromBody] ParametroDto parametroDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Existem dados obrigatórios faltando.");
                }

                if (parametroDto == null) return BadRequest("Erro ao converter o parâmetro do Body");

                if (await Service.Update(parametroId, parametroDto))
                {
                    return Ok<ParametroDto>(parametroDto);
                }
                else
                {
                    return ResponseMessage(Request.CreateResponse(HttpStatusCode.NotModified, "Parâmetro não modificado."));
                }
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// Deletar um parâmetro
        /// </summary>
        /// <remarks>Deleta o parâmetro informado no ID</remarks>
        /// <param name="parametroId">Id do parâmetro a ser deletado</param>
        [Route("{parametroId:int}")]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public async Task<IHttpActionResult> Delete(int parametroId)
        {
            try
            {
                if (await Service.Delete(parametroId))
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
