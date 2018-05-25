using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class AlteracaoUpdateObservacoes
    {
        [Required]
        public string Observacoes { get; set; }
    }
}