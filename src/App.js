import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main_navbar from "./Components/Main_navbar";
import DashBoard from "./DashBoard";
import StarModal from "./StarModal";
import { Overlay } from "./Components/Overlay";

function App() {
  return (
    <>
      <BrowserRouter>
        <Main_navbar />
        <Routes>
          <Route path="/modal" element={<StarModal />} />
          <Route path="/" element={<DashBoard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
