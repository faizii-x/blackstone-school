import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      navigate("/login");
    }

    if (requiredRole && user.role !== requiredRole) {
      navigate("/login");
    }
  }, []);

  return children;
};

export default ProtectedRoute;
