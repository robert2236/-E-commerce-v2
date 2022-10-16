import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProductThunk } from '../store/slices/NewProduct.scile'
import { Button, Card, Col, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';



const Home = () => {
  const productList = useSelector(state => state.product)
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [productFiltered, setProductFiltered] = useState([])
  const [searchValue, SetSearchValue] = useState("")

  useEffect(() => {
    axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
      .then(res => setCategories(res.data.data.categories))
  }, [])

  // console.log(categories)

  useEffect(() => {
    setProductFiltered(productList)
  }, [productList])

  const filterCategory = (categoryId) => {
    const filtered = productList.filter((product) => product.category.id === categoryId);
    setProductFiltered(filtered);
  };

  const searchProduct = () => {
    const filtered = productList.filter((product) =>
      product.title.toLowerCase().includes(searchValue)
    );
    setProductFiltered(filtered)
  }

  return (
    <Row>
      <Carousel fade variant='dark'>
        {
          productList.map((product) => (
            <Carousel.Item key={product.id}>
              <img className="d-block w-100" onClick={() => navigate(`/product/${product.id}`)}
                src={product.productImgs[2]}
                alt="First slide"  style={{objectFit: "contain", height: "350px", background: "white", marginBottom: "50px", padding: "25px", boxShadow: "0 0 10px black, 0 0 40px black, 0 0 80px black", border: "7px solid black"}}
              />
            </Carousel.Item>
          ))
        }
      </Carousel>
      <Col lg={3}>
        <ListGroup>
          {
            categories?.map(category => (
              <ListGroup.Item key={category.id} onClick={() => filterCategory(category.id)} style={{ cursor: "pointer" }}>
                {category.name}
              </ListGroup.Item>
            ))
          }
        </ListGroup>
      </Col>
      <Col>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search Products"
            onChange={(e) => SetSearchValue(e.target.value)}
            value={searchValue}
          />
          <Button variant="dark" onClick={searchProduct}>
            Search Product
          </Button>
        </InputGroup>

        <Row xs={1} md={2} xl={3} className="g-4">
          {productFiltered.map((product) => (
            <Col key={product.id}>
              <Card onClick={() => navigate(`/product/${product.id}`)} className="HomeProduct" style={{ color: "black", boxShadow: "0 0 10px lavender, 0 0 40px lavender, 0 0 80px lavender", border: "8px solid lavender" }}>
                <Card.Img variant="top" src={product.productImgs} style={{ height: "200px", margin: "0 auto", objectFit: "contain" }} />
                <Card.Body style={{textAlign: "center"}}>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>
                    <b>Price: </b><br />{product.price}   <br /> 
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default Home;