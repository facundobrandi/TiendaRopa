using Categoria_Api.Manager;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TindaRopa_Config.Models;
using TindaRopa_Config.Utils;
using TindaRopa_Config.ViewModel;

namespace Categoria_Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoriaController : ControllerBase
    {
        private Tienda_RopaContext _context;
        private CategoriaManager _categoriaManager;

        public CategoriaController(Tienda_RopaContext _RopaContext)
        { 
            _context = _RopaContext;
            _categoriaManager = new CategoriaManager(_RopaContext);
        }

        [HttpGet("Lista")]
        public async Task<IActionResult> lista()
        {
            try
            {
                var lista = await _context.Categoria.Select(i => new
                {
                    i.Id,
                    i.Nombrecategoria,
                }).ToListAsync();

                var responce = new Response((int)SystemEnums.CodesResponce.Ok, lista, "Lista");
                return Ok(responce);
            }
            catch (Exception ex)
            {
                var responce = new Response((int)SystemEnums.CodesResponce.Error, null, "Error");
                return NotFound();
            }
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateCategoria([FromBody] CategoriaModel categorium)
        {
            try
            {
                var responce = await this._categoriaManager.createCategoria(categorium);

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


    }
}