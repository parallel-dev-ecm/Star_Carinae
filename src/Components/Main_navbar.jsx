import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useStore } from "../store";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { data } from "../coordinateSystem";
import * as THREE from "three";
import { useSnapshot } from "valtio";

function Main_navbar() {
  const SCALE = 150;

  const item = data;
  const store = useStore();
 
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    const newControlsTarget = new THREE.Vector3(
      item.x * SCALE,
      item.y * SCALE,
      item.z * SCALE
    );
    store.controlsTarget = newControlsTarget;
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };
  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          Name: {item.Name}
        </span>
      </>
    );
  };

  return (
    <>
      <Navbar className="main_navbar" bg="transparent" variant="light">
        <Container style={{ background: "transparent" }}>
          <Navbar.Brand href="/">
            <img
              src="logo_starCarinae.png"
              alt=""
              style={{
                width: "50px",
                height: "50px",
                background: "transparent",
              }}
            />
          </Navbar.Brand>
          <Nav className="me-auto"></Nav>

          <div style={{ width: 400, backgroundColor: "black" }}>
            <ReactSearchAutocomplete
              on
              styling={{ border: 0, color: "white", backgroundColor: "black" }}
              items={item}
              key={"Id"}
              resultStringKeyName="Name" // String to display in the results
              fuseOptions={{ keys: ["Name"] }} // Search on both fields
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={handleOnSelect}
              onFocus={handleOnFocus}
              autoFocus
              formatResult={formatResult}
            />
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default Main_navbar;
