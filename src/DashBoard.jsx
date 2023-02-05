import React, { Suspense } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import Footer from "./Footer";
import StarScene from "./Scene_one";

import Main_navbar from "./Components/Main_navbar";

function DashBoard() {
  return (
    <>
      <Main_navbar />
      <div className="three_scene">
        <Canvas orthographic camera={{ zoom: 350, position: [0, 0, 0] }}>
          <ambientLight intensity={0.5} />
          <Suspense>
            <StarScene />
          </Suspense>
        </Canvas>
      </div>

      <div className="footer"></div>
    </>
  );
}

export default DashBoard;
