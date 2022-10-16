import React, { useState } from 'react';
import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CarSidebar from './CarSidebar';

const MyNavBar = () => {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem("token", "")
    navigate("/login")
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <Navbar bg="black" variant="dark" expand="lg">
        <Container>
          <div className='logo'></div><Navbar.Brand to="/" as={Link}>TechnologyCommerce </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" style={{marginLeft: "300px"}}>
              <Nav.Link to="/login" as={Link}><i class="fa-solid fa-user"></i></Nav.Link>
              <Nav.Link to="/car" as={Link}><i class="fa-solid fa-bag-shopping"></i></Nav.Link>
              <Nav.Link onClick={handleShow} ><i class="fa-solid fa-cart-shopping"></i></Nav.Link>
              <Nav.Link href='https://e-commerce-hmdgr.netlify.app/'><i class="fa-solid fa-shoe-prints"></i></Nav.Link>
              <Nav.Link onClick={logout}><i class="fa-solid fa-right-from-bracket"></i></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CarSidebar show={show} handleClose={handleClose}/>
    </>
  );
};

export default MyNavBar;