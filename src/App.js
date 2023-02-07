import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "./DashBoard";
import StarModal from "./StarModal";
import Main_navbar from "./Components/Main_navbar";

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
