import { Children } from "react";
import { motion } from "framer-motion";
import { Container, Row, Col, Image } from "react-bootstrap";
const container = {
  hidden: { opacity: 0, height: 0, transition: { staggerChildren: 0.05 } },
  show: {
    opacity: 1,
    height: "auto",
    transition: { when: "beforeChildren", staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: "100%" },
  show: { opacity: 1, y: 0 },
};

function List({ children, open }) {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate={open ? "show" : "hidden"}
    >
      {Children.map(children, (child) => (
        <li>
          <motion.div variants={item}>{child}</motion.div>
        </li>
      ))}
    </motion.ul>
  );
}

export function Overlay(props) {
  const open = true;
  const pos = props.coords;

  return (
    <>
      <div className="info">
        <List open={open}>
          <Container className="d-flex flex-column ">
            <Row>
              <Col className="d-none d-sm-flex">
                <h3>{props.name}</h3>
              </Col>
              <Col className="d-sm-none">
                <h3 style={{ width: "10%" }}>{props.name}</h3>
              </Col>
            </Row>
            <Row>
              <Col className="d-none d-sm-flex">
                <h3>
                  <span className="accent">{props.starType}</span>
                </h3>
              </Col>
            </Row>
            <br className="d-sm-none" />
            <Row>
              <Col className="d-sm-none">
                <h5 style={{ fontSize: "1em" }}>
                  <span className="a">{props.starType}</span>
                </h5>
              </Col>
            </Row>
            <br />
            <Row className="d-flex justify-content-evenly">
              <Col sm={1}>
                <p className="coord">x: {pos.x}</p>
              </Col>
              <Col sm={1}>
                <p className="coord">y: {pos.y}</p>
              </Col>
              <Col sm={1}>
                <p className="coord">z: {pos.z}</p>
              </Col>
            </Row>

            <Row>
              <Col className="d-none d-sm-flex justify-content-center">
                <Image
                  style={{ width: "30%", padding: 0, margin: 0 }}
                  src={props.imgUrl}
                  alt=""
                  fluid
                />
              </Col>
              <Col className="d-sm-none">
                <Image
                  style={{ width: "30%", paddingRight: 0, margin: 0 }}
                  src={props.imgUrl}
                  alt=""
                  fluid
                />
              </Col>
            </Row>

            <br />
            <Row>
              <Col>
                <p
                  className="d-none d-sm-flex text-align-justify "
                  style={{ width: "100%" }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                  perspiciatis dolorem quos cumque fugit! Explicabo mollitia
                  vero, dignissimos commodi quas nam voluptatem sapiente laborum
                  soluta possimus? Tempora recusandae vero totam.
                </p>
              </Col>
            </Row>
            <Row className="text-justify text-align-justify">
              <Col className="text-justify d-sm-none justtify-content-start">
                <p style={{ width: "35%", textAlign: "justify" }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                  perspiciatis dolorem quos cumque fugit! Explicabo mollitia
                  vero, dignissimos commodi quas nam voluptatem sapiente laborum
                  soluta possimus? Tempora recusandae vero totam.
                </p>
              </Col>
            </Row>
          </Container>
        </List>
      </div>
    </>
  );
}
