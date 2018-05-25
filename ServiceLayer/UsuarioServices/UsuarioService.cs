using AutoMapper;
using DataLayer.Entities;
using ServiceLayer.Core;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.DirectoryServices;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.UsuarioServices
{
    public class UsuarioService : GenericBase<Usuario, UsuarioDto>, IUsuarioService
    {
        public UsuarioService(IMapper mapper) : base(mapper)
        {
            UsuarioLogado = "Sistema";
        }

        public async new Task<UsuarioDto> Get(int usuarioId)
        {
            var usuario = await db.Usuarios.FirstOrDefaultAsync(u => u.Id == usuarioId);
            return mapper.Map<Usuario, UsuarioDto>(usuario);
        }

        public async Task<UsuarioDto> Get(string GUID)
        {
            var usuario = await db.Usuarios.FirstOrDefaultAsync(u => u.GUID == GUID);
            if (usuario == null)
            {
                var usuarioAd = await BuscarUsuarioAD(GUID);
                if (usuarioAd != null)
                {
                    return usuarioAd;
                }
            }
            return mapper.Map<Usuario, UsuarioDto>(usuario);
        }

        public UsuarioDto GetSync(string GUID)
        {
            var usuario = db.Usuarios.FirstOrDefault(u => u.GUID == GUID);
            return mapper.Map<Usuario, UsuarioDto>(usuario);
        }

        public async new Task<UsuarioDto> Create(UsuarioDto usuarioDto)
        {
            return await base.Create(usuarioDto);
        }

        public async Task<bool> Update(int estoqueId, UsuarioDto usuarioDto)
        {
            var usuarioOriginal = await base.GetEntity(estoqueId);
            var usuarioAtualizado = mapper.Map<UsuarioDto, Usuario>(usuarioDto);
            usuarioAtualizado.Id = estoqueId;
            if (usuarioOriginal.Nome == usuarioAtualizado.Nome && usuarioOriginal.GUID == usuarioAtualizado.GUID
                    && usuarioOriginal.Permissoes == usuarioAtualizado.Permissoes && usuarioOriginal.Email == usuarioAtualizado.Email
                    && usuarioOriginal.Ativo == usuarioAtualizado.Ativo)
            {
                return false;
            }
            await base.Update(usuarioOriginal, usuarioAtualizado);
            return true;
        }

        public async new Task<bool> Delete(int usuarioId)
        {
            await base.Delete(usuarioId);
            return true;
        }

        public async Task<UsuarioDto> BuscarUsuarioAD(string guid)
        {
            var ldap = string.Format(@"LDAP://<GUID={0}>", guid);
            DirectoryEntry entry = new DirectoryEntry(ldap);

            if (entry.NativeGuid != guid)
            {
                return null;
            }

            string nome = entry.Name.Replace("CN=", "");
            string email = entry.Properties["mail"][0].ToString();

            UsuarioDto addUsuario = new UsuarioDto()
            {
                GUID = entry.NativeGuid,
                Login = entry.Properties["sAMAccountName"][0].ToString(),
                Nome = nome,
                Permissoes = "[]",
                Email = email,
                Ativo = true
            };
            var usuario = await Create(addUsuario);
            return usuario;
        }

        public IEnumerable<UsuarioADDto> BuscarUsuariosAD()
        {
            using (DirectoryEntry entry = new DirectoryEntry("LDAP://ad.phito.com.br/DC=ad,DC=phito,DC=com,DC=br", "PHITOFORMULAS\\OTRSSEARCH", "G5uQj6kt"))
            {
                using (DirectorySearcher directorySearcher = new DirectorySearcher(entry))
                {
                    directorySearcher.Filter = "(&(objectCategory=person)(objectClass=user)(mail=*)(!(UserAccountControl:1.2.840.113556.1.4.803:=2)))";
                    directorySearcher.PropertiesToLoad.Add("CN");
                    directorySearcher.PropertiesToLoad.Add("mail");

                    using (SearchResultCollection searchResult = directorySearcher.FindAll())
                    {
                        var usuarios = new List<UsuarioADDto>();
                        foreach (SearchResult usuarioAD in searchResult)
                        {
                            var usuario = new UsuarioADDto
                            {
                                Nome = usuarioAD.Properties["CN"][0].ToString()
                            };

                            usuarios.Add(usuario);
                        }

                        return usuarios;
                    }
                }
            }
        }
    }
}
