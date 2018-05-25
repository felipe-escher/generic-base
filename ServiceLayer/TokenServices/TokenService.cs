using DataLayer.Context;
using DataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceLayer.TokenServices
{
    public class TokenService : ITokenService
    {
        private AlterarPedidoDb db = new AlterarPedidoDb();

        public ClientDto FindClient(string clientId)
        {
            var client = this.db.Clients.Find(clientId);
            return new ClientDto
            {
                AllowedOrigin = client.AllowedOrigin,
                Ativo = client.Ativo,
                Id = client.Id,
                Nome = client.Nome,
                RefreshTokenLifeTime = client.RefreshTokenLifeTime,
                Secret = client.Secret,
                TipoAplicacao = (TiposAplicacao)client.TipoAplicacao
            };
        }

        public IEnumerable<TokenDto> GetTokens()
        {
            try
            {
                List<TokenDto> tokenDtos = new List<TokenDto>();
                var tokens = this.db.RefreshTokens.ToList();
                foreach (var token in tokens)
                {
                    var dto = new TokenDto()
                    {
                        ClientId = token.ClientId,
                        ExpiresUtc = token.ExpiresUtc,
                        Id = token.Id,
                        IssuedUtc = token.IssuedUtc,
                        ProtectedTicket = token.ProtectedTicket,
                        Subject = token.Subject
                    };
                    tokenDtos.Add(dto);
                }
                return tokenDtos;
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao listar tokens", ex);
            }
        }

        public async Task<TokenDto> FindRefreshToken(string refreshTokenId)
        {
            var refreshToken = await this.db.RefreshTokens.FindAsync(refreshTokenId);
            if (refreshToken != null)
            {
                var dto = new TokenDto()
                {
                    ClientId = refreshToken.ClientId,
                    ExpiresUtc = refreshToken.ExpiresUtc,
                    Id = refreshToken.Id,
                    IssuedUtc = refreshToken.IssuedUtc,
                    ProtectedTicket = refreshToken.ProtectedTicket,
                    Subject = refreshToken.Subject
                };
                return dto;
            }
            return null;
        }

        public async Task<bool> CreateRefreshToken(TokenDto tokenDto)
        {
            var tokensExistentes = this.db.RefreshTokens.Where(r => r.Subject == tokenDto.Subject && r.ClientId == tokenDto.ClientId).ToList();
            foreach (var tokenExistente in tokensExistentes)
            {
                db.RefreshTokens.Remove(tokenExistente);
            }

            var token = new RefreshToken()
            {
                ClientId = tokenDto.ClientId,
                ExpiresUtc = tokenDto.ExpiresUtc,
                Id = tokenDto.Id,
                IssuedUtc = tokenDto.IssuedUtc,
                ProtectedTicket = tokenDto.ProtectedTicket,
                Subject = tokenDto.Subject
            };

            this.db.RefreshTokens.Add(token);
            return await this.db.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteRefreshToken(string tokenId)
        {
            try
            {
                var refreshToken = await this.db.RefreshTokens.FindAsync(tokenId);
                if (refreshToken != null)
                {
                    this.db.RefreshTokens.Remove(refreshToken);
                    return await this.db.SaveChangesAsync() > 0;
                }

                return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao remover token", ex);
            }
        }

        public UsuarioServices.UsuarioDto LoginAdministrador(string senha)
        {
            if (senha == "S5adQF8V")
            {
                var colab = this.db.Usuarios.FirstOrDefault(u => u.GUID == "1");
                if (colab == null)
                {
                    throw new NullReferenceException("O usuário administrador não existe.");
                }
                return new UsuarioServices.UsuarioDto
                {
                    Email = colab.Email,
                    GUID = colab.GUID,
                    Id = colab.Id,
                    Login = colab.Login,
                    Nome = colab.Nome,
                    Permissoes = colab.Permissoes
                };
            }
            else
            {
                return null;
            }
        }
    }
}
