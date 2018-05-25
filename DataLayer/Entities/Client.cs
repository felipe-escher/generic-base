namespace DataLayer.Entities
{
    public class Client : BaseEFEntity
    {
        public string Id { get; set; }
        public string Secret { get; set; }
        public string Nome { get; set; }
        public TiposAplicacao TipoAplicacao { get; set; }
        public bool Ativo { get; set; }
        public int RefreshTokenLifeTime { get; set; }
        public string AllowedOrigin { get; set; }
    }
}
