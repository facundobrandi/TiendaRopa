namespace TindaRopa_Config.ViewModel
{
    public class ProductoModel
    {
        public int Id { get; set; }
        public float Precio { get; set; }
        public string Nombre { get; set; } = null!;
        public string Descripcioncorta { get; set; } = null!;
        public string Descripcionlarga { get; set; } = null!;
        public int StockChico { get; set; }
        public int StockMedio { get; set; }
        public int StockGrande { get; set; }
       // public byte[] Imagenurl { get; set; } = null!;
        public int Tipoaplicacionid { get; set; }
        public int Categoriaid { get; set; }
    }
}
