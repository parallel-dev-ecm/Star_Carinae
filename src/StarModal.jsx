import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { Card, Container } from "react-bootstrap";
import { useState } from "react";


function StarModal() {
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
      <Container>
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
            <Card bg="light" style={{ width: "25rem" }}>
              <Card.Img
                variant="top"
                src={`https://eta-carinae.s3.us-west-2.amazonaws.com/Comp+${id}.png`}
                style={{ width: "100%", height: "50vh" }}
              />
              <Card.Body>
                <Card.Title>
                  {id} {position.x * scale} {position.y * scale}{" "}
                  {position.z * scale}
                </Card.Title>
                <Card.Text>{starType}</Card.Text>
              </Card.Body>
            </Card>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}

export default StarModal;
