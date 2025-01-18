import logo from './logo.svg';
import './App.css';
import { HeaderTienda } from './Header/header';
import {ProductContainer} from './Components/productContainer'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route , Routes } from 'react-router-dom';
import { Home } from './Pages/Home';
import { CreateProduct } from './Pages/CreateProduct';
import { UpdateProduct } from './Pages/UpdateProduct';
import { CreateCategoria } from './Pages/CreateCategoria';
import Carrito from './Components/carrito';

function App() {
  return (
    <>
    <HeaderTienda></HeaderTienda>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/createProduct' element={<CreateProduct></CreateProduct>}></Route>
        <Route path='/createCategory' element={<CreateCategoria></CreateCategoria>}></Route>
        <Route path='/updateProduct/:id' element={<UpdateProduct></UpdateProduct>}></Route>
      </Routes>
    </>
  );
}

export default App;
