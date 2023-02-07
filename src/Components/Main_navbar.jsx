import React, { useRef } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useStore } from "../store";
import Form from "react-bootstrap/Form";

function Main_navbar() {
  const store = useStore();
  const searchTextRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = searchTextRef.current.value;
    store.starSearch = query;
  };

  return (
    <>
      <Navbar className="main_navbar" bg="transparent" variant="light">
        <Container style={{ background: "transparent" }}>
          <Navbar.Brand href="/">
            <img
              src="logo_starCarinae.png"
              alt=""
              style={{
                width: "50px",
                height: "50px",
                background: "transparent",
              }}
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Form
              className=""
              onSubmit={handleSubmit}
              style={{ width: "200px", opacity: "0.6" }}
            >
              <Form.Control
                ref={searchTextRef}
                style={{ color: "white", backgroundColor: "black" }}
                placeholder="Search galaxy"
                className="me-5"
                aria-label="Search"
              />
            </Form>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Main_navbar;
