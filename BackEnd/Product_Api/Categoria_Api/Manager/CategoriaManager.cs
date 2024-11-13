using TindaRopa_Config.Models;
using TindaRopa_Config.Utils;
using TindaRopa_Config.ViewModel;

namespace Categoria_Api.Manager
{
    public class CategoriaManager
    {
        private Tienda_RopaContext _context;
        public CategoriaManager(Tienda_RopaContext _RopaContext) { _context = _RopaContext; }

        public async Task<Response> createCategoria(CategoriaModel categorium) 
        {

            if (string.IsNullOrEmpty(categorium.Nombrecategoria)) return new Response((int)SystemEnums.CodesResponce.Error, null, "Categoria requieres a name ");

            var newCategoria = new Categorium() 
            {
                Nombrecategoria = categorium.Nombrecategoria,
            };

            await this._context.Categoria.AddAsync(newCategoria);

            await this._context.SaveChangesAsync();

          return new Response((int)SystemEnums.CodesResponce.Ok,null, "Categoria creada");

        }
    }
}
