import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Entities } from "./pages/Entities";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-ink">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entities" element={<Entities />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
