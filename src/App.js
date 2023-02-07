import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "./DashBoard";
import StarModal from "./StarModal";
import { StarProvider } from "./StateContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <StarProvider>
          <Routes>
            <Route path="/modal" element={<StarModal />} />
            <Route path="/" element={<DashBoard />} />
          </Routes>
        </StarProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
