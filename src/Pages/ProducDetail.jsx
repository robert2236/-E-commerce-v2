import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Carousel, Col, ListGroup, Row } from 'react-bootstrap';
import { addProductThunk } from '../store/slices/carSidebar.slice';

const ProducDetail = () => {
  const { id } = useParams();
  const productList = useSelector((state) => state.product)
  const [ quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  const producttDetail = productList.find((product) => product.id === Number(id))
  const relatedProducts = productList.filter((product) => product?.category.id === producttDetail?.category.id)

  useEffect(() => {
    setQuantity(0)
  }, [id])

  const addToCar = () => {
    const products = {
      id: id,
      quantity: quantity
    }
    dispatch(addProductThunk(products))
  }

  return (
    <Row>
      <Col style={{textAlign: "center"}}>
        <h1 style={{color: "white"}}>{producttDetail?.title}</h1>
        <Carousel fade variant='dark'>
        {
          producttDetail?.productImgs.map((product) => (
            <Carousel.Item key={product.id}>
              <img className="d-block w-100" 
                src={product}
                alt="First slide"  style={{objectFit: "contain", height: "350px", background: "white", marginBottom: "50px", padding: "25px", boxShadow: "0 0 10px black, 0 0 40px black, 0 0 80px black", border: "7px solid black"}}
              />
            </Carousel.Item>
          ))
        }
      </Carousel>
        <p style={{marginTop: "30px", fontSize: "17px"}} className="pH">{producttDetail?.description}</p>
        <p className='price'>Price: <br />${producttDetail?.price}</p>
        <div className='quantity'>
          <Button className='me-5' onClick={() => setQuantity(quantity-1)}>-</Button>
          {quantity}
          <Button className='ms-5' onClick={() => setQuantity(quantity+1)}>+</Button>
        </div>
        <Button className='mt-4' variant="dark" onClick={addToCar}>
          Add To Car
          </Button>{' '}
      </Col>

      <Col lg={3}>
        <ListGroup>
          {
            relatedProducts.map((products) => (
              <ListGroup.Item key={products.id} style={{marginBottom: "35px", border: "8px solid lavender", textAlign: "center", boxShadow: "0 0 10px lavender, 0 0 40px lavender, 0 0 80px lavender"}}>
                <Link to={`/product/${products.id}`}>
                  {products.title} 
                  <img style={{objectFit: "contain", height: "150px"}} className='img-fluid' src={products.productImgs} /> <br />  Price: <br />{products.price} 
                </Link>
              </ListGroup.Item>
            ))
          }
        </ListGroup>
      </Col>
    </Row>
  );
};

export default ProducDetail;