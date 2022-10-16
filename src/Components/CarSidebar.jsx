import React, { useEffect } from 'react';
import { Button, ListGroup, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProductThunk, purchaseCar, sidebarThunk } from '../store/slices/carSidebar.slice';

const CarSidebar = ({show, handleClose}) => {

  const dispatch = useDispatch();

  const sidebar = useSelector(state => state.sidebar);

  useEffect(() =>{
    dispatch(sidebarThunk())
  }, [])


  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" style={{color: "black"}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Car</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
         {
          sidebar.map((product) => (
            <ListGroup.Item key={product.id}>
              <Link to={`/product/${product.id}`} style={{textDecoration: "None"}}>
                {product.title} <br />  Price: {product.price * product.productsInCart.quantity}<br /> Quantity: {product.productsInCart.quantity}
              </Link>
            </ListGroup.Item>
          ))
         }
         </ListGroup>
        </Offcanvas.Body>
        <Button onClick={() => dispatch(purchaseCar())}>
          Purchase
         </Button>
      </Offcanvas>
  );
};

export default CarSidebar;