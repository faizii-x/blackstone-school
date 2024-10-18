import { useNavigate } from "react-router-dom";



const ProtectedRoute = ({ children, requiredRole }) => {

const navigate = useNavigate()

  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("user")); 

  if (!token) {
    navigate("/login");
  }

  // Check if the requiredRole is matched with the user's role
  if (requiredRole && user.role !== requiredRole) {
     navigate("/login")
  }

  return children;
};

export default ProtectedRoute