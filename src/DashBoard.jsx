import React, { Suspense } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import Footer from "./Footer";
import StarScene from "./Scene_one";
import { Environment, MeshTransmissionMaterial } from "@react-three/drei";
import { easing } from "maath";
import { useStore } from "./store";
import { Container } from "react-bootstrap";
import { useRef } from "react";
import { Overlay } from "./Components/Overlay";

function Selector({ children }) {
  const ref = useRef();
  const store = useStore();
  useFrame(({ viewport, camera, pointer }, delta) => {
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, 3]);
    easing.damp3(
      ref.current.position,
      [(pointer.x * width) / 2, (pointer.y * height) / 2, 3],
      store.open ? 0 : 0.1,
      delta
    );
    easing.damp3(
      ref.current.scale,
      store.open ? 4 : 0.01,
      store.open ? 0.5 : 0.2,
      delta
    );
    easing.dampC(
      ref.current.material.color,
      store.open ? "#f0f0f0" : "#ccc",
      0.1,
      delta
    );
  });
  return (
    <>
      <mesh ref={ref}>
        <circleGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          samples={16}
          resolution={512}
          anisotropy={1}
          thickness={0.1}
          roughness={0.4}
          toneMapped={true}
        />
      </mesh>
      <group
        onClick={() => (store.open = true)}
        onPointerOut={() => (store.open = false)}
        onPointerUp={() => (store.open = false)}
      >
        {children}
      </group>
    </>
  );
}

function DashBoard() {
  return (
    <>
      <Container>
        <div className="three_scene">
          <Canvas orthographic camera={{ zoom: 250, position: [0, 0, 0] }}>
            <ambientLight intensity={0.5} />
            <Selector>
              <StarScene />
            </Selector>
          </Canvas>
        </div>
      </Container>

      <div className="footer"></div>
    </>
  );
}

export default DashBoard;
