
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export const Product = ({precio , Nombre , descShort , image}) => {

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
      <Button variant="primary">Comprar </Button>
    </Card.Body>
  </Card>
  )
}
