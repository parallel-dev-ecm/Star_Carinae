import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { Card, Container } from "react-bootstrap";
import { useState } from "react";

function StarModal() {
  const hist = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(true);
  const { position, name, id, color, starType, url } = location.state || {};
  console.log(id);

  const checkIdBelow100 = (id) => {
    return id < 100 ? true : false;
  };

  const handleExit = () => {
    hist("/");
  };

  return (
    <>
      <Container>
        <Modal
          style={{ color: "white" }}
          onExit={handleExit}
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton className="close-icon-white">
            <Modal.Title id="Star_Modal_Title">{name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card border="0c" bg="light" style={{ width: "25rem" }}>
              <Card.Img
                variant="top"
                src={`https://eta-carinae.s3.us-west-2.amazonaws.com/Comp+${id}.png`}
                style={{ width: "100%", height: "50vh" }}
              />
              <Card.Body>
                <Card.Title>
                  {checkIdBelow100(id) ? "10" + id : "1" + id}
                </Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}

export default StarModal;
