import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Main_navbar() {
  return (
    <>
      <Navbar className="main_navbar" bg="transparent" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="logo_starCarinae.png"
              alt=""
              style={{ width: "50px", height: "50px" }}
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Main_navbar;
