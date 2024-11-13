import React from 'react'
import { HeaderTienda } from '../Header/header';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import FormSelect from 'react-bootstrap/FormSelect'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useGetCategoria } from '../ApiCalls/GetCategorias';
import { PostProducts } from '../ApiCalls/PostProducts';
import { useParams } from 'react-router-dom';
import { GetProductsById } from '../ApiCalls/GetProductsById';
import { UpdatePostProducts } from '../ApiCalls/UpdatePostProducts';

export const UpdateProduct = () => {

    const { id } = useParams();

    // Convert the id to an integer (optional)
    const productId = parseInt(id);

    const [selectedOption, setSelectedOption] = useState(0); // Valor inicial

    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
    };

    const { categoria, loading_2, error_2 } = useGetCategoria();

    if (productId==0){
        return <p>No Product</p>;
    };

    const { product, loading, error } = GetProductsById(productId);

    if (loading_2) return <p>Cargando...</p>;
    if (error_2) return <p>Error: {error_2.message}</p>;

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

  
    // Esquema de validación usando Yup
  const validationSchema = Yup.object({
    product: Yup.string().required('El nombre del producto es obligatorio'),
    descriptionShort: Yup.string().required('La descripción corta es obligatoria'),
    descriptionLong: Yup.string(),
    stockChico: Yup.number().required('El stock es obligatorio').min(1, 'Debe ser mayor o igual a 1'),
    stockMedio: Yup.number().required('El stock es obligatorio').min(1, 'Debe ser mayor o igual a 1'),
    stockLargo: Yup.number().required('El stock es obligatorio').min(1, 'Debe ser mayor o igual a 1'),
    price: Yup.number().required('El precio es obligatorio').min(1, 'Debe ser mayor o igual a 1'),
    categoriaId: Yup.number().required('El precio es obligatorio').min(1, 'Debe ser mayor o igual a 1'),
  });
  
    const initialValues = {
      product: product.name,
      descriptionShort: product.descShort,
      descriptionLong: product.descLong,
      stockChico: product.stockSmall,
      stockMedio: product.stockMedium,
      stockLargo: product.stockLarge,
      price: product.price,
      categoriaId: product.categoryId,
      image: null,
    };


  
    const handleSubmit = (values) => {
      console.log(values);
      UpdatePostProducts(values,productId)
    };
  
    return (
      <div>
      <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form noValidate>
            <Row className="mb-3">
              <Col md="4">
                <div className="form-group">
                  <label htmlFor="product">Product</label>
                  <Field
                    name="product"
                    type="text"
                    className="form-control"
                    placeholder="Product Name"
                  />
                  <ErrorMessage name="product" component="div" className="text-danger" />
                </div>
              </Col>
              <Col md="8">
                <div className="form-group">
                  <label htmlFor="descriptionShort">Description Short</label>
                  <Field
                    name="descriptionShort"
                    type="text"
                    className="form-control"
                    placeholder="Description"
                  />
                  <ErrorMessage name="descriptionShort" component="div" className="text-danger" />
                </div>
              </Col>
            </Row>
  
            <Row className="mb-3">
              <Col>
                <div className="form-group">
                  <label htmlFor="descriptionLong">Description Long</label>
                  <Field as="textarea" name="descriptionLong" rows={3} className="form-control" />
                  <ErrorMessage name="descriptionLong" component="div" className="text-danger" />
                </div>
              </Col>
            </Row>
  
            <Row className="mb-3">
              <Col md="4">
                <div className="form-group">
                  <label htmlFor="stockChico">Stock Chico</label>
                  <Field name="stockChico" type="number" className="form-control" />
                  <ErrorMessage name="stockChico" component="div" className="text-danger" />
                </div>
              </Col>
              <Col md="4">
                <div className="form-group">
                  <label htmlFor="stockMedio">Stock Medio</label>
                  <Field name="stockMedio" type="number" className="form-control" />
                  <ErrorMessage name="stockMedio" component="div" className="text-danger" />
                </div>
              </Col>
              <Col md="4">
                <div className="form-group">
                  <label htmlFor="stockLargo">Stock Largo</label>
                  <Field name="stockLargo" type="number" className="form-control" />
                  <ErrorMessage name="stockLargo" component="div" className="text-danger" />
                </div>
              </Col>
            </Row>
  
            <Row className="mb-3">
              <Col md="4">
                <div className="form-group">
                  <label htmlFor="price">Precio</label>
                  <Field name="price" type="number" className="form-control" />
                  <ErrorMessage name="price" component="div" className="text-danger" />
                </div>
              </Col>
              <Col md="4">
                <div className="form-group">
                  <label htmlFor="image">Imagen</label>
                  <input
                    name="image"
                    type="file"
                    className="form-control"
                    onChange={(event) => {
                      setFieldValue('image', event.currentTarget.files[0]);
                    }}
                  />
                  <ErrorMessage name="image" component="div" className="text-danger" />
                </div>
              </Col>
              <Col md="4">
                <div className="form-group">
                  <label htmlFor="categoriaId">Categorias</label>
                  <FormSelect value={selectedOption == 0 ? product.categoryId : selectedOption}
                   onChange={(event)=>
                   {setFieldValue("categoriaId",event.currentTarget.options.selectedIndex) ;
                    handleSelectChange(event)
                   }} aria-label="Default select example">
                    <option>Open this select menu</option>
                    {categoria.length > 0 ? (
                          categoria.map((x) => (
                            <option key={x.id} value={x.id} id={x.id}>{x.nombrecategoria}</option>
                          ))
                      ) : (
                          <option>No hay disponibles</option>
                      )}
                  </FormSelect>
                  <ErrorMessage name="categoriaId" component="div" className="text-danger" />
                </div>
              </Col>
            </Row>
  
            <Button type="submit" disabled={isSubmitting}>
              Submit form
            </Button>
          </Form>
        )}
      </Formik>
      </Container>
      </div>
    )
}
