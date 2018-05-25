using System;

namespace DataLayer.Entities
{
    public class Log : BaseEFEntity
    {
        public int Id { get; set; }
        public string NomeUsuario { get; set; }
        public DateTime DataHora { get; set; }
        public string Modulo { get; set; }
        public string Acao { get; set; }
        public string Mensagem { get; set; }
        public string DadosAntigos { get; set; }
        public string DadosNovos { get; set; }
    }
}
