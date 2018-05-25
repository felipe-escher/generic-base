using DataLayer.Entities;
using Newtonsoft.Json;

namespace ServiceLayer.Helpers
{
    public static class Helper
    {
        public static Log LogUsuario(string nomeUsuario, string modulo, string acao, string mensagem, string antigos = "", string novos = "")
        {
            return new Log()
            {
                NomeUsuario = nomeUsuario,
                DataHora = System.DateTime.Now,
                Modulo = modulo,
                Acao = acao,
                Mensagem = mensagem,
                DadosAntigos = antigos,
                DadosNovos = novos
            };
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
    }
}
