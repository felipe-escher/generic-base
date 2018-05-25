namespace ServiceLayer.TokenServices
{
    public enum TiposAplicacao
    {
        Javascript = 0,
        NativaConfidencial = 1
    }

    public class ClientDto
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
