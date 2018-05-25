namespace DataLayer.Entities
{
    public class Usuario : BaseEFEntity
    {
        public int Id { get; set; }
        public string GUID { get; set; }
        public string Login { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Permissoes { get; set; }
        public bool Ativo { get; set; }
        public string ConnectionId { get; set; }
    }
}
