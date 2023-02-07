import React, { useContext, useState, useEffect } from "react";
import * as THREE from "three";

const starContext = React.createContext();

const initialTarget = new THREE.Vector3();

export function useStarContext() {
  return useContext(starContext);
}

export function StarProvider({ children }) {
  const [orbitControlstarget, setOrbitControlsTarget] = useState([0, 0, 0]);
  function updateOrbitTarget(newTargetVector) {
    setOrbitControlsTarget(newTargetVector);
  }

  const value = { orbitControlstarget, updateOrbitTarget };

  return <starContext.Provider value={value}>{children}</starContext.Provider>;
}
