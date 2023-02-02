import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useThree } from "react-three-fiber";
import Footer from "./Footer";
import StarScene from "./Scene_one";
import { data } from "./coordinateSystem";
import { Row, Col, Container } from "react-bootstrap";

function DashBoard() {
  return (
    <>
      <Container>
        <div className="three_scene">
          <Canvas orthographic camera={{ zoom: 250, position: [0, 0, 0] }}>
            <ambientLight intensity={0.5} />

            <Suspense>
              <StarScene />
            </Suspense>
          </Canvas>
        </div>
      </Container>

      <div className="footer"></div>
    </>
  );
}

export default DashBoard;
