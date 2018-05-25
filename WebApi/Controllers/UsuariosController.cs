using Elmah;
using ServiceLayer.UsuarioServices;
using Swashbuckle.Swagger.Annotations;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WebApi.Helpers;
using System.Linq;

namespace WebApi.Controllers
{
    [RoutePrefix("api/usuarios")]
    [Authorize]
    public class UsuariosController : ApiController
    {
        private IUsuarioService Service;

        public UsuariosController(IUsuarioService _service)
        {
            this.Service = _service;
            this.Service.UsuarioLogado = Helper.UsuarioLogado;
        }

        /// <summary>
        /// Buscar todos os usuários ativos
        /// </summary>
        /// <remarks>Busca uma lista dos usuários ativos cadastrados</remarks>
        [Route("", Name = "Usuarios")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(List<UsuarioDto>))]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public async Task<IHttpActionResult> Get()
        {
            try
            {
                var usuarios = await Service.GetAll().Where(x => x.Ativo == true).ToListAsync();
                return Ok<IEnumerable<UsuarioDto>>(usuarios);
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                return InternalServerError();
            }
        }

        /// <summary>
        /// Buscar todos os usuários
        /// </summary>
        /// <remarks>Busca uma lista dos usuários cadastrados</remarks>
        [Route("inativos", Name = "UsuariosGetComInativos")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(List<UsuarioDto>))]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public async Task<IHttpActionResult> GetComInativos()
        {
            try
            {
                var usuarios = await Service.GetAll().ToListAsync();
                return Ok<IEnumerable<UsuarioDto>>(usuarios);
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                return InternalServerError();
            }
        }

        /// <summary>
        /// Buscar usuários pelo nome
        /// </summary>
        /// <remarks>Busca uma lista dos usuários cadastrados filtrando pelo nome</remarks>
        [AllowAnonymous]
        [Route("nome/{nome}", Name = "UsuariosPeloNome")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(List<UsuarioDto>))]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public async Task<IHttpActionResult> GetUsuariosPeloNome(string nome)
        {
            try
            {
                var usuarios = await Service.GetAll().Where(u => u.Nome.Contains(nome)).ToListAsync();
                return Ok<IEnumerable<UsuarioDto>>(usuarios);
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                return InternalServerError();
            }
        }

        /// <summary>
        /// Buscar um usuário
        /// </summary>
        /// <remarks>Busca um usuário no sistema pelo ID do mesmo</remarks>
        /// <param name="usuarioId">Id do usuário a ser retornado</param>
        [HttpGet]
        [Route("{usuarioId:int}", Name = "Usuario")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(UsuarioDto))]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public async Task<IHttpActionResult> Get(int usuarioId)
        {
            try
            {
                var usuario = await Service.Get(usuarioId);
                if (usuario != null)
                {
                    return Ok<UsuarioDto>(usuario);
                }
                return NotFound();
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                return InternalServerError();
            }
        }

        /// <summary>
        /// Buscar um usuário pelo GUID
        /// </summary>
        /// <remarks>Busca um usuário no sistema pelo GUID do mesmo</remarks>
        /// <param name="usuarioId">Id do usuário a ser retornado</param>
        [HttpGet]
        [Route("guid/{guid}", Name = "UsuarioGuid")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(UsuarioDto))]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public async Task<IHttpActionResult> Get(string guid)
        {
            try
            {
                var usuario = await Service.Get(guid);
                if (usuario != null)
                {
                    return Ok<UsuarioDto>(usuario);
                }
                return NotFound();
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                return InternalServerError();
            }
        }

        /// <summary>
        /// Editar um usuário
        /// </summary>
        /// <remarks>Salva as alterações enviadas no corpo da requisição no usuário informado no ID</remarks>
        /// <param name="usuarioId">Id do usuário a ser editado</param>
        /// <param name="usuarioDto">Dados do usuário a ser atualizado</param>
        [HttpPatch]
        [HttpPut]
        [Route("{usuarioId:int}")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(UsuarioDto))]
        [SwaggerResponse(HttpStatusCode.NotModified)]
        [SwaggerResponse(HttpStatusCode.BadRequest)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public async Task<IHttpActionResult> Put(int usuarioId, [FromBody] UsuarioDto usuarioDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Existem dados obrigatórios faltando.");
                }

                if (usuarioDto == null) return BadRequest("Erro ao converter o usuário do Body");

                if (await Service.Update(usuarioId, usuarioDto))
                {
                    return Ok<UsuarioDto>(usuarioDto);
                }
                else
                {
                    return ResponseMessage(Request.CreateResponse(HttpStatusCode.NotModified, "Usuário não modificado."));
                }
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                return InternalServerError();
            }
        }
    }
}
