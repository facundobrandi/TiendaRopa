
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useDispatch,useSelector } from 'react-redux';
import { agregarAlCarrito } from '../Redux/actions';

import { ToastContainer, toast } from 'react-toastify';


export const Product = ({Id,precio , Nombre , descShort , image}) => {

  const dispatch = useDispatch();

  const notify = () =>   toast.success('Producto comprado !', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  const handleAgregarAlCarrito = () => {
    const productObj = {Id,Nombre , precio}
    notify();
    dispatch(agregarAlCarrito(productObj));
  };

  return (
    <Card style={{ width: '18rem' , marginLeft : '2rem' , marginBottom : '2rem' }}>
    <Card.Img variant="top" style={{width: '16em', height:'22rem' }} src={ image != null ? `data:image/jpeg;base64,${image}` : require('../ImagenPlaceHolder/OIP.png')} />
    <Card.Body>
      <Card.Title>{Nombre}</Card.Title>
      <Card.Text>
        ARS $ {precio}
      </Card.Text>
      <Card.Text>
        {descShort}
      </Card.Text>
      <Button variant="primary" onClick={handleAgregarAlCarrito}>Comprar </Button>
      <ToastContainer />
    </Card.Body>
  </Card>
  )
}
