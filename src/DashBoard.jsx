import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import StarScene from "./Scene_one";

function DashBoard() {
  return (
    <>
      <div className="three_scene">
        <Canvas
          orthographic
          camera={{ zoom: 300, near: 0, far: 1000, position: [0, 0, 0] }}
        >
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
