import {React} from 'react';
import { Container, Navbar, NavDropdown ,Nav, Button,Offcanvas } from 'react-bootstrap';
import { useGetProducts } from '../ApiCalls/GetProducts';
import { useState } from 'react';
import Carrito from '../Components/carrito';


export const HeaderTienda = () => {
  const  { products, loading, error } = useGetProducts(0);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/home">Tienda Ropa</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <NavDropdown title="Products">
                <NavDropdown.Item href="/createProduct">Create Product</NavDropdown.Item>
                <NavDropdown title="Update Products" drop='end'>
                    {products.map((x)=>{const id ="/updateProduct/" +  x.id;return <NavDropdown.Item href={id}>{x.name}</NavDropdown.Item>})}
                </NavDropdown>
            </NavDropdown>
            <NavDropdown title="Categoria">
                <NavDropdown.Item href="/createCategory">Create Category</NavDropdown.Item>
            </NavDropdown>
   
          </Nav>
          <Button variant="primary" onClick={handleShow}>
                Ver carrito 
              </Button>
      </Container>
      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Carrito></Carrito>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}