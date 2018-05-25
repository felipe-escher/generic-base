using System.Collections.Generic;

namespace WebApi.Models
{
    public class DashboardModel
    {
        public List<AlteracoesPorAtendente> AlteracoesPorAtendentes { get; set; }
        public List<AlteracoesPorSetor> AlteracoesPorSetor { get; set; }
    }
}