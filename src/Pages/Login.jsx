import axios from 'axios';
import React from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const submit = (data) => {
    console.log(data)
    axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', data)
      .then(res => {
        localStorage.setItem("token", res.data.data.token)
        navigate("/")
        alert("usuario loggeado")
      })
      .catch(error => {
        if (error.response?.status === 404) {
          alert("Credenciales invalidas")
        }
        console.log(error.response)
      });
  }

  return (
    <Row>
      <Col style={{marginLeft: "350px"}}>
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
          <h1 style={{ color: "white", textAlign: "center" }}> Welcome! Enter your email and password to continue</h1>
          <Form onSubmit={handleSubmit(submit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control {...register("email")} type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control{...register("password")} type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Col>

      <Col>
        <ListGroup.Item>
          Text Data <br />
          Email: john@gmail.com <br />
          Password: john1234
        </ListGroup.Item>
      </Col>
    </Row>
  );
};

export default Login;