import React, { Suspense } from "react";
import { Canvas, useThree } from "react-three-fiber";
import Footer from "./Footer";
import StarScene from "./Scene_one";
import { data } from "./coordinateSystem";

function DashBoard() {
  return (
    <>
      <div className="three_scene" style={{ width: "100%", height: "100vh" }}>
        <Canvas>
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
