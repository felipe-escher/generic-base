using ServiceLayer.Core;
using System.ComponentModel.DataAnnotations;

namespace ServiceLayer.ParametroServices
{
    public class ParametroDto : BaseDto
    {
        public int Id { get; set; }

        [Required]
        public string Nome { get; set; }

        [Required]
        public string Argumento { get; set; }
        public string SubArgumento { get; set; }
        public string Descricao { get; set; }
    }
}
