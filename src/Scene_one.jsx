import { useTexture, useGLTF, Html } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { useThree } from "react-three-fiber";
import { data } from "./coordinateSystem";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useStore } from "./store";

function StarScene(props) {
  // CONST AND VARIABLES DEFINITION
  const history = useNavigate();
  const globalState = useStore();
  console.log(globalState);
  const nRef = useRef();
  const group_ref = useRef();
  const orbit_controls = useRef();
  const target_vector = new THREE.Vector3();

  const [controls, setControls] = useState();
  const [currentName, setCurrentName] = useState();
  const [divPosition, setDivPosition] = useState(new THREE.Vector3());

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
    nRef ? (nRef.current.style.opacity = 1) : console.log("no name ref yet");

    setCurrentName(obj.name);

    console.log(obj);

    let pos = new THREE.Vector3();
    obj.getWorldPosition(pos);
    gsap.to(obj.scale, { x: 0.09, y: 0.09, z: 0.09 });

    setDivPosition([pos.x, pos.y - 0.05, pos.z]);
  };
  // const onPointerLeave = (e) => {
  //   nRef.current.style.opacity = 0;

  //   const obj = e.object;

  //   gsap.to(obj.scale, { x: 0.05, y: 0.05, z: 0.05 });
  // };

  const handleDoubleClick = (e) => {
    const obj = e.object;
    const pos = new THREE.Vector3();
    obj.getWorldPosition(pos);
    pos.multiplyScalar(SCALE);
    console.log(obj);
    history("/modal", {
      state: {
        position: pos,
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

  // Fix coordinateSystem Id_values to match with AWS url id values.
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

      {/* HTML DIV STAR NAME CREATION */}
      <Html scale={0.005} position={divPosition}>
        <p
          ref={nRef}
          style={{
            color: "white",
            fontSize: "8px",
            width: "0",
            height: "0",
            opacity: 0,
          }}
        >
          {currentName}
        </p>
      </Html>

      {/* STAR CREATION mapping coordinateSystem values */}

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
              <group
                name={"starAndName"}
                position={row_Vector}
                onPointerEnter={onPointerEnter}
              >
                <Star
                  url={"STAR.png"}
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
    </>
  );
}

export default StarScene;
