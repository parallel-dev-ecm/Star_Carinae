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
          <Nav className="me-auto"></Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Main_navbar;
