// components/Carrito.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { eliminarDelCarrito } from '../Redux/actions';
import { Button } from 'react-bootstrap';
import "../Css/Carrito.css";

const svg = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>

function Carrito() {
  const carrito = useSelector((state) => state.carrito);
  const dispatch = useDispatch();

  carrito.forEach(element => {
    console.log(element)  
  });

  const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);

  return (
    <div className="carrito">
      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul>
          {carrito.map((producto, index) => (<>
            <li key={index}>
              {producto.Nombre}
              <Button className="eliminar" onClick={()=>{console.log(index) ; dispatch(eliminarDelCarrito(index))}}>{svg}</Button>
            </li>
            </>
          ))}
         
        </ul>
      )}
      <h3>Total: ${total}</h3>
    </div>
  );
}

export default Carrito;
