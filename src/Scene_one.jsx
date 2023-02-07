import { useTexture, Html, PresentationControls } from "@react-three/drei";
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
  let newId = 1000;
  useEffect(() => {
    console.log(store.starSearch);
  }, [store]);

  const history = useNavigate();
  const nRef = useRef();
  const group_ref = useRef();
  const orbit_controls = useRef();

  const target_vector = new THREE.Vector3();

  const [currentName, setCurrentName] = useState();
  const [divPosition, setDivPosition] = useState(new THREE.Vector3());

  const SCALE = 150;
  let i = 1000;
  const state = useThree();

  const camera = state.camera;
  const scene = state.scene;

  const renderer = state.gl;

  // useEffect hook,
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

    // child.children[0].length > 0
    //   ? gsap.fromTo(child.children[0], { scale: 0 }, { scale: 1, delay: 4 })
    //   : console.log("no child");
    return () => {
      ctx.revert();
    };
  }, []);

  renderer.setClearColor(0x0000000);

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
          <spriteMaterial map={texture} side={THREE.DoubleSide} />
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
      <PresentationControls
        domElement={orbit_controls}
        enabled={true} // the controls can be disabled by setting this to false
        global={false} // Spin globally or by dragging the model
        cursor={true} // Whether to toggle cursor style on drag
        snap={false} // Snap-back to center (can also be a spring config)
        speed={1} // Speed factor
        zoom={1} // Zoom factor when half the polar-max is reached
        azimuth={[-Infinity, Infinity]}

        // Horizontal limits
      >
        <OrbitControls
          ref={orbit_controls}
          minZoom={300}
          enableRotate={false}
          maxZoom={800}
        />

        <group ref={group_ref}>
          {data.map((row) => {
            let x = parseFloat(row.x) * SCALE;
            let y = parseFloat(row.y) * SCALE;
            let z = parseFloat(row.z) * SCALE;

            const row_Vector = new THREE.Vector3(x, y, z);
            newId = checkIdBelow100(row.Id) ? "10" + row.Id : "1" + row.Id;
            console.log(newId);

            return (
              <>
                <Star
                  url={`star.png`}
                  position={row_Vector}
                  scale={0.05}
                  name={row.Name}
                  unique_id={newId}
                  color={row.Color}
                  starType={row.Star_type}
                />

                {i++}
              </>
            );
          })}
        </group>
      </PresentationControls>

      {/* HTML DIV STAR NAME CREATION */}
      <Html scale={0.005} position={divPosition}>
        <p
          ref={nRef}
          style={{
            color: "white",
            fontSize: "1em",
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
