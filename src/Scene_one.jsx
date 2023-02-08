import { useTexture, Html, Polyhedron } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { useThree } from "react-three-fiber";
import { data } from "./coordinateSystem";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useStore } from "./store";

function StarScene(props) {
  // CONST AND VARIABLES DEFINITION
  const store = useStore();

  const history = useNavigate();
  const nRef = useRef();
  const group_ref = useRef();
  const [currentName, setCurrentName] = useState();
  const [divPosition, setDivPosition] = useState(new THREE.Vector3());

  const SCALE = 400;
  let i = 1000;
  const state = useThree();
  const scene = state.scene;
  const renderer = state.gl;

  //ANIMATIONS USE EFFECT HOOK
  useEffect(() => {
    const ctx = gsap.context(() => {
      const groupScaleInitialAnimation = gsap.fromTo(
        group_ref.current.scale,
        { x: 0, y: 0, z: 0 },
        {
          x: 1,
          y: 1,
          z: 1,
          delay: 0.5,
          duration: 1.5,
          ease: "slow(0.7, 0.7, false)",
        }
      );
    }, group_ref);

    return () => {
      ctx.revert();
    };
  }, []);

  renderer.setClearColor(0x0000000);

  const handleClick = (e) => {
    const obj = e.object;
    let pos = new THREE.Vector3();
    obj.getWorldPosition(pos);

    setCurrentName(obj.name);
    console.log(obj);
    //orbitControls.target = pos;

    setDivPosition([pos.x, pos.y - 0.05, pos.z]);
    nRef ? (nRef.current.style.opacity = 1) : console.log("no name ref yet");
  };

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

  const handleExit = (e) => {
    nRef.current.style.opacity = 0;
  };

  function Star(props) {
    const texture = useTexture(props.url);
    return (
      <>
        <sprite
          onDoubleClick={handleDoubleClick}
          onClick={handleClick}
          onPointerLeave={handleExit}
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
      <group ref={group_ref}>
        {data.map((row) => {
          const url = `star.png`;

          let x = parseFloat(row.x) * SCALE;
          let y = parseFloat(row.y) * SCALE;
          let z = parseFloat(row.z) * SCALE;

          const row_Vector = new THREE.Vector3(x, y, z);
          // row_Vector.normalize();
          // row_Vector.multiplyScalar(2);

          return (
            <>
              <Star
                url={url}
                position={row_Vector}
                scale={0.04}
                name={row.Name}
                unique_id={
                  checkIdBelow100(row.Id) ? "10" + row.Id : "1" + row.Id
                }
                color={row.Color}
                starType={row.Star_type}
              />

              {i++}
            </>
          );
        })}
      </group>

      {/* HTML DIV STAR NAME CREATION */}
      <Html scale={0.005} position={divPosition}>
        <p
          ref={nRef}
          style={{
            color: "white",
            fontSize: "0.6em",
            width: "0",
            height: "0",
            lineHeight: " 1.25em",
            marginBottom: "0.2em",
            opacity: 0,
          }}
        >
          {currentName}
        </p>
      </Html>
      {/* STAR CREATION mapping coordinateSystem values */}
    </>
  );
}

export default StarScene;
