using Newtonsoft.Json;
using System;
using System.Security.Claims;
using System.Security.Cryptography;

namespace WebApi.Helpers
{
    public static class Helper
    {
        public static string GetHash(string input)
        {
            HashAlgorithm hashAlgorithm = new SHA256CryptoServiceProvider();

            byte[] byteValue = System.Text.Encoding.UTF8.GetBytes(input);
            byte[] byteHash = hashAlgorithm.ComputeHash(byteValue);

            return Convert.ToBase64String(byteHash);
        }

        public static string UsuarioLogado
        {
            get
            {
                if (ClaimsPrincipal.Current.FindFirst(ClaimTypes.Name) == null)
                {
                    return "Nenhum usuário logado.";
                }
                return ClaimsPrincipal.Current.FindFirst(ClaimTypes.Name).Value;
            }
        }

        public static string ConverterJson(object value)
        {
            return JsonConvert.SerializeObject(value,
                Formatting.None,
                new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
        }

        public static DateTime ConverteDataAte(string ate)
        {
            var retorno = Convert.ToDateTime(ate);

            if (retorno.Hour == 0)
            {
                retorno.AddHours(23);
            }
            return retorno;
        }
    }
}