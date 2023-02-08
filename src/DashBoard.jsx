import { OrbitControls } from "@react-three/drei";
import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import StarScene from "./Scene_one";
import { useStore } from "./store";

function DashBoard() {
  const store = useStore();

  return (
    <>
      <div className="three_scene">
        <Canvas>
          <OrbitControls
            enablePan={false}
            target={store.controlsTarget}
            zoomSpeed={0.5}
          />

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
