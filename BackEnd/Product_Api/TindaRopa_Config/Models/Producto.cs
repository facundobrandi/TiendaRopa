using System;
using System.Collections.Generic;

namespace TindaRopa_Config.Models
{
    public partial class Producto
    {
        public int Id { get; set; }
        public float Precio { get; set; }
        public string Nombre { get; set; } = null!;
        public string Descripcioncorta { get; set; } = null!;
        public string Descripcionlarga { get; set; } = null!;
        public int StockChico { get; set; }
        public int StockMedio { get; set; }
        public int StockGrande { get; set; }
        public byte[] Imagenurl { get; set; } = null!;
        public int Categoriaid { get; set; }

        public virtual Categorium Categoria { get; set; } = null!;
    }
}
