import Landing from "../src/pages/landing";
import Admin from "../src/pages/admin";
import Student from "../src/pages/student";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./index.css";
import Login from "./components/login";
import Signup from "./components/signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/student" element={<Student />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
