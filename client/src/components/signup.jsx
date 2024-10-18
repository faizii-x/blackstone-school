import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();``
    console.log("hello jannnn");
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/api/signup`, userData)
      .then((response) => {
        console.log(response.data.message);
        if(response.data.success) {
          setUserData({ name: "", email: "", password: "" });
          alert(response.data.message)
          navigate("/login")
        }
        else{
          alert(response.data.message)
        }
      })
      .catch((error) => {
        // console.log(error)
        alert(error);
      });
  };

  return (
    <>
      <div className="background-image-signup relative">
        <div className="flex items-center justify-center min-h-screen  absolute -translate-x-1/2 left-1/2">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-2 text-[#053976]">SignUp</h2>
            <form onSubmit={handleSignUp}>
              <div className="mb-2">
                <label className="block text-[#053976]">Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-3 py-2 border-2 border-[#053976] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label className="block text-[#053976]">Email</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border-2 border-[#053976] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userData.email}
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="block text-[#053976]">Password</label>
                <input
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 border-2 border-[#053976] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userData.password}
                  onChange={handleChange}
                />
              </div>
              {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}
              <button
                type="submit"
                className="w-full bg-[#053976] text-white py-2 rounded-lg hover:bg-[#03163c]"
              >
                SignUp
              </button>
            </form>

            <span className="flex justify-center items-center gap-1 mt-2">
              <span className="text-[12px] text-gray-600 ">
                Already have an account?
              </span>
              <Link
                to="/login"
                className="text-[12px] font-bold text-[#053976]"
              >
                LogIn
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
