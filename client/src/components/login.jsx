import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {

const [userData, setUserData] = useState({
email: "",
password:""
})


  // const [error, setError] = useState('');
  // const [role, setRole] = useState('');

  const handleChange = (e) => {
    setUserData({...userData, [e.target.name] : e.target.value})

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_SERVER_URL}/api/login`, userData)
    .then((response) =>{
      console.log("response>>>>>", response)
    })

  }

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
              name='email'
              className="w-full px-3 py-2 border-2 border-[#053976] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#053976]">Password</label>
            <input
              type="password"
              name='password'
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
            Login
          </button>
        </form>
        {/* {role && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-bold">Role: {role}</h3>
            {role === 'admin' ? (
              <p>Redirecting to Admin Dashboard...</p>
            ) : (
              <p>Redirecting to Student Dashboard...</p>
            )}
          </div>
        )} */}



<span className="flex justify-center items-center gap-1 mt-2">
              <span className="text-[12px] text-gray-600 ">
                Create an account?
              </span>
              <Link to="/signup" className="text-[12px] font-bold text-[#053976]">
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
