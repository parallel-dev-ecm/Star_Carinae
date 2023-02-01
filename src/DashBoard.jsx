import React, { Suspense } from "react";
import { Canvas, useThree } from "react-three-fiber";
import Footer from "./Footer";
import StarScene from "./Scene_one";
import { data } from "./coordinateSystem";
import { Row, Col, Container } from "react-bootstrap";
import { OrthographicCamera } from "@react-three/drei";

function DashBoard() {
  return (
    <>
      <Container>
        <div className="three_scene">
          <Canvas>
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