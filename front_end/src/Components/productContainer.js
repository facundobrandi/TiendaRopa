import React, { useEffect, useState } from 'react'
import { Container, Dropdown, Row } from 'react-bootstrap'
import { Product } from './product';
import axios from 'axios';
import {  useGetProducts } from '../ApiCalls/GetProducts';
import { useGetCategoria } from "../ApiCalls/GetCategorias";


export const ProductContainer = () => {  
    const [IdCategoria,SetCategoria] = useState(0);

    const { products, loading, error } =  useGetProducts(IdCategoria);

    const { categoria, loading_2, error_2 } = useGetCategoria();



    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    if (loading_2) return <p>Cargando...</p>;
    if (error_2) return <p>Error: {error.message}</p>;

  return (
    <Container>
        <div>
            Productos
        </div>
      <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Categoria
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={()=> SetCategoria(0)}> Todos </Dropdown.Item>
          {categoria.length > 0 ? (
                        categoria.map((x, indice) => (
                            <Dropdown.Item href="#/action-1" key={indice}
                            onClick={()=> SetCategoria(x.id)}>{x.nombrecategoria}</Dropdown.Item>
                        ))
                    ) : (
                        <Dropdown.Item disabled>No hay categorías disponibles</Dropdown.Item>
                    )}

          </Dropdown.Menu>
      </Dropdown>
        <Row>
        {products.map((x,indice) => <Product key={indice} 
        precio={x.price} Nombre={x.name} descShort={x.descShort} image={x.image}
         ></Product>)}
        </Row>
    </Container>
  )
}
