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
          <h3>{props.name}</h3>
          <h3>
            <span className="accent">{props.starType}</span>
          </h3>
          <Container>
            <div className=" modalStarDiv">
              <img
                style={{ width: "53%", height: "30vh" }}
                src={props.imgUrl}
                alt=""
              />
            </div>
          </Container>

          <div className="flex">
            <p className="coord">{pos.x}</p>
            <p className="coord">{pos.y}</p>
          </div>
        </List>
      </div>
    </>
  );
}
