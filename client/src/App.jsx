import Landing from "../src/pages/landing";
import Admin from "../src/pages/admin";
import Student from "../src/pages/student";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./index.css";
import Login from "./components/login";
import Signup from "./components/signup";
import ProtectedRoutes from "./components/protectedRoutes";

function App() {
  return (
    <>

    
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />


          <Route path="/admin" element={
            <ProtectedRoutes requiredRole="Admin">
            <Admin />
            </ProtectedRoutes>
            } />



          <Route path="/student" element={
            <ProtectedRoutes requiredRole="Student">
            <Student />
            </ProtectedRoutes>
            } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
