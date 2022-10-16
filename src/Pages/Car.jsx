import React, { useEffect } from 'react';
import { Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Car = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const purchases = useSelector(state => state.purchases)

  useEffect(() => {
    dispatch(getPurchasesThunk())
  }, [])

  return (
    <div>
      <h1>Purchases</h1>
      <ListGroup>
        {
          purchases.map(purchase => (
            <ListGroup.Item key={purchase.id}>
              <Row>
                <Col md={3} lg={6}>
                  <div>
                    {
                    purchase.cart?.products?.map(e => (
                      <p  onClick={() => navigate(`/product/${e.id}`)} key={e.id}>{e.title} {e.price}</p>
                    ))}
                    <h5>{purchase.cart?.products?.length}</h5>
                  </div>
                </Col>
              </Row>

            </ListGroup.Item>
          ))
        }
      </ListGroup>
    </div>
  );
};

export default Car;