using System;
using System.Collections.Generic;

namespace TindaRopa_Config.Models
{
    public partial class Categorium
    {
        public Categorium()
        {
            Productos = new HashSet<Producto>();
        }

        public string Nombrecategoria { get; set; } = null!;
        public int Id { get; set; }

        public virtual ICollection<Producto> Productos { get; set; }
    }
}
