import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { Container } from "react-bootstrap";
import { useState } from "react";
import { Overlay } from "./Components/Overlay";

function StarModal(props) {
  const hist = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(true);
  const { position, name, id, starType } = location.state || {};

  const url = `https://eta-carinae.s3.us-west-2.amazonaws.com/Comp+${id}.png`;
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
        size="lg"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>
            <Container>
              <span>#{id - 1000}</span>
            </Container>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Overlay
              name={name}
              starType={starType}
              coords={position}
              imgUrl={url}
              starId={id}
            />
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default StarModal;
