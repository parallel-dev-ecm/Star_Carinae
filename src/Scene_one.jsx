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
  // CONST AND VARIABLES DEFINITION
  const history = useNavigate();
  const nameRef = useRef();
  const group_ref = useRef();
  const orbit_controls = useRef();
  const target_vector = new THREE.Vector3();

  const [nameDiv, setNameDiv] = useState();
  const [controls, setControls] = useState();
  const [namePos, setNamePos] = useState([0, 0, 0]);

  const SCALE = 150;
  let i = 1000;
  const state = useThree();
  const camera = state.camera;

  const renderer = state.gl;

  // useEffect hook,
  useEffect(() => {
    setControls(orbit_controls.current);

    return () => {};
  }, []);

  renderer.setClearColor(0x0000000);
  camera.position.set(0, 0, 0);

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

    controls
      ? gsap.to(controls.target, {
          x: pos.x,
          y: pos.y,
          z: pos.z,
        })
      : console.log("no controls");
  };

  const onPointerEnter = (e) => {
    const obj = e.object;
    let pos = new THREE.Vector3();
    obj.getWorldPosition(pos);

    setNameDiv(nameRef);
    console.log(nameRef);

    gsap.to(obj.scale, { x: 0.09, y: 0.09, z: 0.09 });
  };
  const onPointerLeave = (e) => {
    const obj = e.object;
    const parent = obj.parent;
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
              <group name={"starAndName"} position={row_Vector}>
                <Html
                  portal={nameRef}
                  scale={0.005}
                  position={[0, -0.03, 0]}
                  material={
                    <meshPhysicalMaterial side={THREE.DoubleSide} opacity={1} />
                  }
                >
                  <p
                    style={{
                      color: "white",
                      fontSize: "10px",
                      width: "0",
                      height: "0",
                      opacity: 1,
                    }}
                  >
                    {row.Name}
                  </p>
                </Html>

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
