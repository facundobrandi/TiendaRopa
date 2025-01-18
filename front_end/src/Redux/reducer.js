// redux/reducer.js
import { AGREGAR_AL_CARRITO, ELIMINAR_DEL_CARRITO } from "./actions";

const initialState = {
  carrito: JSON.parse(localStorage.getItem("carrito")) || [],
};

const carritoReducer = (state = initialState, action) => {
  switch (action.type) {
    case AGREGAR_AL_CARRITO:
      const nuevoCarrito = [...state.carrito, action.payload];
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito)); // Guardar en localStorage
      return { ...state, carrito: nuevoCarrito };

    case ELIMINAR_DEL_CARRITO:
      const carritoActualizado = state.carrito.filter(
        (producto) => producto.id !== action.payload
      );
      localStorage.setItem("carrito", JSON.stringify(carritoActualizado)); // Guardar en localStorage
      return { ...state, carrito: carritoActualizado };

    default:
      return state;
  }
};

export default carritoReducer;
