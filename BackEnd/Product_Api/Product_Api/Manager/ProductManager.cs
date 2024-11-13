using Microsoft.EntityFrameworkCore;

using TindaRopa_Config.Models;
using TindaRopa_Config.Utils;
using TindaRopa_Config.ViewModel;

namespace Product_Api.Manager
{
    public class ProductManager
    {
        private Tienda_RopaContext _context;
        public ProductManager(Tienda_RopaContext _RopaContext) { _context = _RopaContext; }

        public async Task<Response> CreateProduct(ProductoModel producto, IFormFile Image)
        {
            var validation = validationProduct(producto);

            if (validation != "-" )
            {
                var responce = new Response((int)SystemEnums.CodesResponce.Error, null, "Error : " + validation);
                return responce;
            }

            if (Image == null)
            {
                var responce = new Response((int)SystemEnums.CodesResponce.Error, null, "Image is needed");
                return responce;
            }

            var newProducto = new Producto()
            {
                Nombre = producto.Nombre,
                Precio = producto.Precio,
                StockChico = producto.StockChico,
                StockGrande = producto.StockGrande,
                StockMedio = producto.StockMedio,
                Categoriaid = producto.Categoriaid,
                Descripcioncorta = producto.Descripcioncorta,
                Descripcionlarga = producto.Descripcionlarga,
                Imagenurl = FileToBytea(Image),
            };

            await this._context.Productos.AddAsync(newProducto);

            await this._context.SaveChangesAsync();

            return new Response((int)SystemEnums.CodesResponce.Ok, producto, "Producto Creado");
        }

        public async Task<Response> UpdateProduct(ProductoModel producto, IFormFile Image , int id)
        {
            var validation = validationProduct(producto);

            if (validation != "-")
            {
                var responce = new Response((int)SystemEnums.CodesResponce.Error, null, "Error : " + validation);
                return responce;
            }

            var oldProduct = await this._context.Productos.Where(i => i.Id == id).FirstOrDefaultAsync();

            if (oldProduct == null)
            {
                var responce = new Response((int)SystemEnums.CodesResponce.Error, null, "Error : Product was not found");
                return responce;
            }

            oldProduct.Nombre = producto.Nombre;
            oldProduct.Precio = producto.Precio;
            oldProduct.StockChico = producto.StockChico;
            oldProduct.StockGrande = producto.StockGrande;
            oldProduct.StockMedio = producto.StockMedio;
            oldProduct.Categoriaid = producto.Categoriaid;
            oldProduct.Descripcioncorta = producto.Descripcioncorta;
            oldProduct.Descripcionlarga = producto.Descripcionlarga;
            oldProduct.Imagenurl = Image != null ? FileToBytea(Image) : oldProduct.Imagenurl;

            await this._context.SaveChangesAsync();

            return new Response((int)SystemEnums.CodesResponce.Ok, producto, "Producto modificado");
        }

        private string validationProduct(ProductoModel producto)
        {
            if (string.IsNullOrEmpty(producto.Nombre)) return "Nombre is null";
            if (string.IsNullOrEmpty(producto.Descripcionlarga)) return "DescLong is null";
            if (string.IsNullOrEmpty(producto.Descripcioncorta)) return "DescShort is null";
            if (producto.Precio <= 0) return "price can´t be 0 or less";
            if (producto.StockChico <= 0) return "StockSmall can´t be 0 or less";
            if (producto.StockMedio <= 0) return "StockMedium can´t be 0 or less";
            if (producto.StockGrande <= 0) return "StockBig can´t be 0 or less";
            if (producto.Categoriaid == 0) return "Categoria can´t be 0 ";

            return "-";
        }

        private byte[] FileToBytea(IFormFile file)
        {
            byte[] fileByteArray;    //1st change here
            if (file != null)
            {
                using (var item = new MemoryStream())
                {
                    file.CopyTo(item);
                    fileByteArray = item.ToArray(); //2nd change here
                    return fileByteArray;
                }
            }
            else
            {
                return null;
            }
        }
    }
}
