using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Product_Api.Manager;
using TindaRopa_Config.Utils;
using TindaRopa_Config.ViewModel;
using TindaRopa_Config.Models;

namespace Product_Api.Controllers
{

    [ApiController]
    [Route("Product")]
    public class ProductController : Controller
    {
        private  Tienda_RopaContext _context;
        private ProductManager productManager;

        public ProductController(Tienda_RopaContext _RopaContext) 
        {
            _context = _RopaContext;
            productManager = new ProductManager(_RopaContext);
        }

        [HttpGet("Lista")]
        public async Task<IActionResult> lista(int  idCategoria)
        {
            try
            {
                var lista = await _context.Productos.Where(i => 
                idCategoria != 0 ? i.Categoriaid == idCategoria : i.Categoriaid > 0
                ).Select(i => new
                {
                    i.Id,
                    name = i.Nombre,
                    descLong = i.Descripcionlarga,
                    descShort = i.Descripcioncorta,
                    price = i.Precio,
                    image = i.Imagenurl,
                    stockSmall = i.StockChico,
                    stockMedium = i.StockMedio,
                    stockLarge = i.StockGrande,
                }).ToListAsync();

                var responce = new Response((int)SystemEnums.CodesResponce.Ok, lista,"Lista");
                return Ok(responce);
            }
            catch (Exception ex)
            {
                var responce = new Response((int)SystemEnums.CodesResponce.Error, null,"Error");
                return NotFound();
            }
        }


        [HttpGet("GetById")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var lista = await _context.Productos.Where(i=> i.Id == id ).Select(i => new
                {
                    i.Id,
                    name = i.Nombre,
                    descLong = i.Descripcionlarga,
                    descShort = i.Descripcioncorta,
                    price = i.Precio,
                    //image = i.ImagenUrl,
                    stockSmall = i.StockChico,
                    stockMedium = i.StockMedio,
                    stockLarge = i.StockGrande,
                    categoryId = i.Categoriaid,
                }).FirstOrDefaultAsync();

                if (lista == null)
                {
                    var responceError = new Response((int)SystemEnums.CodesResponce.Error, null, "id was not found");
                    return NotFound(responceError);
                }

                var responce = new Response((int)SystemEnums.CodesResponce.Ok, lista, "Lista");
                return Ok(responce);
            }
            catch (Exception ex)
            {
                var responce = new Response((int)SystemEnums.CodesResponce.Error, null, "Error");
                return NotFound(responce);
            }
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateProduct([FromForm]ProductoModel producto)
        {
            try
            {
                var responce = await this.productManager.CreateProduct(producto, Request.Form.Files[0]);

                if (responce.code == (int)SystemEnums.CodesResponce.Error)
                {
                    var responceError = new Response((int)SystemEnums.CodesResponce.Error, null, "Error");
                    return NotFound(responceError);
                }

                return Ok(responce);
            }
            catch (Exception)
            {
                var responce = new Response((int)SystemEnums.CodesResponce.Error, null , "Error");
                return NotFound(responce);
            }
        }

        [HttpPost("update")]
        public async Task<IActionResult> UpdateProduct([FromForm] ProductoModel producto , int id)
        {
            try
            {
                var file = Request.Form.Files.Count == 1 ? Request.Form.Files[0] : null;

                var responce = await this.productManager.UpdateProduct(producto, file, id);

                if (responce.code == (int)SystemEnums.CodesResponce.Error)
                {
                    var responceError = new Response((int)SystemEnums.CodesResponce.Error, null, "Error");
                    return NotFound(responceError);
                }

                return Ok(responce);
            }
            catch (Exception)
            {
                var responce = new Response((int)SystemEnums.CodesResponce.Error, null, "Error");
                return NotFound(responce);
            }
        }

        [HttpGet("Delete")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var lista = await _context.Productos.Where(i => i.Id == id).FirstOrDefaultAsync();

                if (lista == null)
                {
                    var responceError = new Response((int)SystemEnums.CodesResponce.Error, null, "id was not found");
                    return NotFound(responceError);
                }

                this._context.Productos.Remove(lista);

                await this._context.SaveChangesAsync();

                var responce = new Response((int)SystemEnums.CodesResponce.Ok, null, "Delete completed");
                return Ok(responce);
            }
            catch (Exception ex)
            {
                var responce = new Response((int)SystemEnums.CodesResponce.Error, null, "Error");
                return NotFound(responce);
            }
        }


    }
}
