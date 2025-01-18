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



export const CreateProduct = () => {

  const { categoria, loading_2, error_2 } = useGetCategoria();

  if (loading_2) return <p>Cargando...</p>;
  if (error_2) return <p>Error: {error_2.message}</p>;

  
const validationSchema = Yup.object({
  product: Yup.string().required('El nombre del producto es obligatorio'),
  descriptionShort: Yup.string().required('La descripción corta es obligatoria'),
  descriptionLong: Yup.string(),
  stockChico: Yup.number().required('El stock es obligatorio').min(1, 'Debe ser mayor o igual a 1'),
  stockMedio: Yup.number().required('El stock es obligatorio').min(1, 'Debe ser mayor o igual a 1'),
  stockLargo: Yup.number().required('El stock es obligatorio').min(1, 'Debe ser mayor o igual a 1'),
  price: Yup.number().required('El precio es obligatorio').min(1, 'Debe ser mayor o igual a 1'),
  categoriaId: Yup.number().required('El precio es obligatorio').min(1, 'Debe ser mayor o igual a 1'),
  image: Yup.mixed().required('La imagen es obligatoria'),
});

  const initialValues = {
    product: '',
    descriptionShort: '',
    descriptionLong: '',
    stockChico: 1,
    stockMedio: 1,
    stockLargo: 1,
    price: 1,
    categoriaId: 0,
    image: null,
  };

  const handleSubmit = (values) => {
    console.log(values);
    PostProducts(values)
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
                <FormSelect onChange={(event)=>{setFieldValue("categoriaId",event.currentTarget.options.selectedIndex)}} aria-label="Default select example">
                  <option>Open this select menu</option>
                  {categoria.length > 0 ? (
                        categoria.map((x) => (
                          <option key={x.id} id={x.id}>{x.nombrecategoria}</option>
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

