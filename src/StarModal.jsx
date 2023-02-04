import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { Card, Container } from "react-bootstrap";
import { useState } from "react";
import { Overlay } from "./Components/Overlay";

function StarModal(props) {
  const scale = 150;
  const hist = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(true);
  const { position, name, id, color, starType, url } = location.state || {};
  console.log(id);

  const checkIdBelow100 = (id) => {
    return id < 100 ? true : false;
  };

  console.log(`https://eta-carinae.s3.us-west-2.amazonaws.com/Comp+${id}.png`);

  const handleExit = () => {
    hist("/");
  };

  return (
    <>
      <Modal
        style={{ color: "white" }}
        onExit={handleExit}
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title id="Star_Modal_Title">{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Overlay name={name} starType={starType} coords={position} />
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default StarModal;
