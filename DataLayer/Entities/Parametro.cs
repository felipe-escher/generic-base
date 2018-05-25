namespace DataLayer.Entities
{
    public class Parametro : BaseEFEntity
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Argumento { get; set; }
        public string SubArgumento { get; set; }
        public string Descricao { get; set; }
    }
}
