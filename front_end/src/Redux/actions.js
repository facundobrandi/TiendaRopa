// redux/actions.js
export const AGREGAR_AL_CARRITO = "AGREGAR_AL_CARRITO";
export const ELIMINAR_DEL_CARRITO = "ELIMINAR_DEL_CARRITO";

export const agregarAlCarrito = (Nombre) => ({
  type: AGREGAR_AL_CARRITO,
  payload: Nombre,
});

export const eliminarDelCarrito = (productoId) => ({
  type: ELIMINAR_DEL_CARRITO,
  payload: productoId,
});
