import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';


import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CreateCategori } from '../ApiCalls/CreateCategori';

export const CreateCategoria = () => {

  const validationSchema = Yup.object
  ({
    Nombrecategoria : Yup.string().required("El nombre es Requerido")
  });

  const initialValues = 
  {
    Nombrecategoria : "Category"
  };

  const handleSubmit = (values) => {
    console.log(values);
    CreateCategori(values)
  };

  return (
    <div>
      <Container>
        <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
        >
        <Form noValidate>
          <Row>
          <Col md="4">
              <div className="form-group">
                <label htmlFor="Nombrecategoria">Categoria</label>
                <Field
                  name="Nombrecategoria"
                  type="text"
                  className="form-control"
                  placeholder="NameCategory"
                />
                <ErrorMessage name="Nombrecategoria" component="div" className="text-danger" />
              </div>
            </Col>
          </Row>

          <Button type="submit">
            Submit form
          </Button>
        </Form>
        </Formik>
      </Container>
    </div>
  )
}
