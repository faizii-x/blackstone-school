import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();

  // Validation schema by using Yup Library
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address format")
      .matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, "Complete email is required")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values) => {
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/api/login`, values)
      .then((response) => {
        if (response.data.success) {
          const token = response.data.token;
          const role = response.data.user.role;

          // Store user details in local storage
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("authToken", token);

          toast.success(response.data.message || "Login successful!");
          setTimeout(() => {
            if (role === "Admin") {
              navigate("/admin");
            } else if (role === "Student") {
              navigate("/student");
            }
          }, 2000);
        } else {
          toast.error(response.data.message || "Login failed");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while logging in");
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="background-image-signup relative">
        <div className="flex items-center justify-center min-h-screen absolute -translate-x-1/2 left-1/2">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[330px] class-width-manage">
            <h2 className="text-2xl font-bold text-[#053976] mb-2">Login</h2>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="mb-2">
                  <label className="block text-[#053976]">Email</label>
                  <Field
                    type="text"
                    name="email"
                    className="w-full px-3 py-2 border-2 border-[#053976] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-600 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#053976]">Password</label>
                  <Field
                    type="password"
                    name="password"
                    className="w-full px-3 py-2 border-2 border-[#053976] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-600 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#053976] text-white py-2 rounded-lg hover:bg-[#03163c]"
                >
                  Login
                </button>
              </Form>
            </Formik>

            <span className="flex justify-center items-center gap-1 mt-2">
              <span className="text-[12px] text-gray-600 ">
                Create an account?
              </span>
              <Link
                to="/"
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
