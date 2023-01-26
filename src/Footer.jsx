import React, { useRef } from "react";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import StarScene from "./Scene_one";

function Footer(props) {
  const input_text = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = input_text.current.value;
  };

  return (
    <Navbar
      className="justify-content-md-center"
      fixed="bottom"
      bg="transparent"
      expand="lg"
    >
      <Form onSubmit={handleSubmit}>
        <Form.Control
          ref={input_text}
          type="search"
          className="navbar-form"
          placeholder="Search"
          aria-label="Search"
          size="sm"
          style={{ marginBottom: "10px" }}
        />
      </Form>
    </Navbar>
  );
}

export default Footer;
