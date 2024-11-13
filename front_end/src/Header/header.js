import {React} from 'react';
import { Container, Navbar, NavDropdown ,Nav } from 'react-bootstrap';
import { useGetProducts } from '../ApiCalls/GetProducts';


export const HeaderTienda = () => {
  const  { products, loading, error } = useGetProducts(0);
  
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
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
      </Container>
    </Navbar>
  );
}