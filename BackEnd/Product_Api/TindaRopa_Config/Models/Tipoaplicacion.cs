using System;
using System.Collections.Generic;

namespace TindaRopa_Config.Models
{
    public partial class Tipoaplicacion
    {
        public Tipoaplicacion()
        {
            Productos = new HashSet<Producto>();
        }

        public string Nombre { get; set; } = null!;
        public int Id { get; set; }

        public virtual ICollection<Producto> Productos { get; set; }
    }
}
