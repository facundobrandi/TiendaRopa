// components/Carrito.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { eliminarDelCarrito } from '../Redux/actions';

function Carrito() {
  const carrito = useSelector((state) => state.carrito);
  const dispatch = useDispatch();

  console.log(carrito)

  const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);

  return (
    <div style={{ border: "1px solid #333", padding: "10px", marginTop: "20px" }}>
      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul>
          {carrito.map((producto, index) => (
            <li key={index}>
              {producto.Nombre}
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${total}</h3>
    </div>
  );
}

export default Carrito;
