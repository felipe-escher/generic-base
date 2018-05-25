using System.Collections.Generic;
using System.Threading.Tasks;

namespace ServiceLayer.TokenServices
{
    public interface ITokenService
    {
        IEnumerable<TokenDto> GetTokens();
        Task<bool> DeleteRefreshToken(string tokenId);
        UsuarioServices.UsuarioDto LoginAdministrador(string senha);
        ClientDto FindClient(string clientId);
        Task<bool> CreateRefreshToken(TokenDto tokenDto);
        Task<TokenDto> FindRefreshToken(string refreshTokenId);
    }
}
