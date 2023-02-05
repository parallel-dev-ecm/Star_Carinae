import { Children } from "react";
import { motion } from "framer-motion";
import { useStore } from "../store";
import { Container } from "react-bootstrap";
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
  const state = useStore();
  const pos = props.coords;

  console.log(props.imgUrl);
  return (
    <>
      <div className="info">
        <List open={state.open}>
          <Container className="d-flex flex-column ">
            <h3>{props.name}</h3>
            <h3>
              <span className="accent">{props.starType}</span>
            </h3>
            <br />
            <div class="d-flex justify-content-evenly">
              <p className="coord">x: {pos.x}</p>
              <p className="coord">y: {pos.y}</p>
              <p className="coord">z: {pos.z}</p>
            </div>
            <div className="d-flex justify-content-center">
              <img
                style={{
                  width: "45%",
                  height: "40vh",
                }}
                src={props.imgUrl}
                alt=""
              />
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
              perspiciatis dolorem quos cumque fugit! Explicabo mollitia vero,
              dignissimos commodi quas nam voluptatem sapiente laborum soluta
              possimus? Tempora recusandae vero totam.
            </p>
          </Container>
        </List>
      </div>
    </>
  );
}
