import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/api/login`, userData)
      .then((response) => {
        console.log("response>>>>>", response);

        if (response.data.success) {
          const token = response.data.token;
          const role = response.data.user.role;

          // Store user details in local storage
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("authToken", token);

          // Conditional navigation based on role
          if (role === "Admin") {
            navigate("/admin");
          } else if (role === "Student") {
            navigate("/student");
          }
        }
      });
  };

  return (
    <>
      <div className="background-image-signup relative">
        <div className="flex items-center justify-center min-h-screen absolute -translate-x-1/2 left-1/2">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-[#053976] mb-2">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="block text-[#053976]">Email</label>
                <input
                  type="text"
                  name="email"
                  className="w-full px-3 py-2 border-2 border-[#053976] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#053976]">Password</label>
                <input
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 border-2 border-[#053976] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userData.password}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#053976] text-white py-2 rounded-lg hover:bg-[#03163c]"
              >
                Login
              </button>
            </form>

            <span className="flex justify-center items-center gap-1 mt-2">
              <span className="text-[12px] text-gray-600 ">
                Create an account?
              </span>
              <Link
                to="/signup"
                className="text-[12px] font-bold text-[#053976]"
              >
                SignUp
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
