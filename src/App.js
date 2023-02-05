import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "./DashBoard";
import StarModal from "./StarModal";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/modal" element={<StarModal />} />
          <Route path="/" element={<DashBoard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
