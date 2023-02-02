import { useTexture, useGLTF, Html, Text } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { data } from "./coordinateSystem";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function StarScene(props) {
  const history = useNavigate();

  const [objLookAt, setObjLookAt] = useState();

  const [currentStarName, setCurrentStarName] = useState();

  const nameRef = useRef();
  const target_vector = new THREE.Vector3();
  const group_ref = useRef();
  const starScene = useRef(null);

  const [enableRotate, setEnableRotate] = useState(true);

  const SCALE = 150;
  let i = 1000;
  const state = useThree();
  const camera = state.camera;
  camera.position.set(0, 0, 0);

  const renderer = state.gl;
  const orbit_controls = useRef();

  renderer.setClearColor(0x0000000);

  function LoadGTLF(props) {
    const { scene } = useGLTF(props.url);
    return <primitive object={scene} {...props} />;
  }

  function BG_scene() {
    const bg_texture = useTexture("bg.jpeg");
    return (
      <>
        <mesh>
          <sphereGeometry args={[100, 32, 16]} />
          <meshBasicMaterial map={bg_texture} side={THREE.BackSide} />
        </mesh>
      </>
    );
  }

  const handleClick = (e) => {
    const obj = e.object;
    let pos = new THREE.Vector3();
    obj.getWorldPosition(pos);

    orbit_controls
      ? gsap.to(orbit_controls.current.target, {
          x: pos.x,
          y: pos.y,
          z: pos.z,
        })
      : console.log("no controls");
    setEnableRotate(false);
  };

  const onPointerEnter = (e) => {
    const obj = e.object;
    const parent = obj.parent;
    const text = parent.children[0];
    text.visible = true;
    gsap.to(obj.scale, { x: 0.09, y: 0.09, z: 0.09 });
  };
  const onPointerLeave = (e) => {
    const obj = e.object;
    const parent = obj.parent;
    const text = parent.children[0];
    text.visible = false;
    gsap.to(obj.scale, { x: 0.05, y: 0.05, z: 0.05 });
  };

  const handleDoubleClick = (e) => {
    const obj = e.object;
    console.log(obj);
    history("/modal", {
      state: {
        position: obj.position,
        name: obj.userData.name,
        id: obj.userData.id,
        color: obj.userData.color,
        starType: obj.userData.starType,
      },
    });
  };

  function Star(props) {
    const texture = useTexture(props.url);
    return (
      <>
        <sprite
          onDoubleClick={handleDoubleClick}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onClick={handleClick}
          {...props}
          userData={{
            name: props.name,
            id: props.unique_id,
            color: props.color,
            starType: props.starType,
          }}
        >
          <spriteMaterial map={texture} />
        </sprite>
      </>
    );
  }

  const checkIdBelow100 = (id) => {
    return id < 100 ? true : false;
  };

  return (
    <>
      {target_vector ? (
        <OrbitControls
          ref={orbit_controls}
          position={[0, 0, 0]}
          enableRotate={false}
          enablePan={false}
        />
      ) : (
        console.log("no_target")
      )}

      <Html as="div" ref={nameRef}>
        {console.log(nameRef.current)}
      </Html>

      <group ref={group_ref}>
        {data.map((row) => {
          let x = parseFloat(row.x) * SCALE;
          let y = parseFloat(row.y) * SCALE;
          let z = parseFloat(row.z) * SCALE;

          const row_Vector = new THREE.Vector3(x, y, z);
          row_Vector.normalize();
          row_Vector.multiplyScalar(2);

          return (
            <>
              <group position={row_Vector}>
                <Text
                  occlude
                  visible={false}
                  color={"white"}
                  scale={0.03}
                  characters="ψγβχφπημνζδε"
                  position={[
                    row_Vector.x / SCALE,
                    (row_Vector.y + 10) / SCALE,
                    row_Vector.z / SCALE,
                  ]}
                >
                  {row.Name}
                </Text>
                <Star
                  url={`STAR.png`}
                  scale={0.05}
                  name={row.Name}
                  unique_id={
                    checkIdBelow100(row.Id) ? "10" + row.Id : "1" + row.Id
                  }
                  color={row.Color}
                  starType={row.Star_type}
                />
              </group>

              {i++}
            </>
          );
        })}
      </group>
      {/* <BG_scene /> */}
    </>
  );
}

export default StarScene;
