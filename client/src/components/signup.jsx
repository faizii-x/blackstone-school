import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const navigate = useNavigate();

  // Validation schema using Yup Library
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address format")
      .matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, "Complete email is required")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSignUp = (values, { resetForm }) => {
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/api/signup`, values)
      .then((response) => {
        console.log("Full response", response);
        if (response.data && response.data.success) {
          toast.success(response.data.message);
          setTimeout(() => {
            resetForm();
            navigate("/login");
          }, 2000);
        } else {
          toast.error(response.data.message || "Signup failed");
        }
      })
      .catch((error) => {
        console.error("Signup error", error);
        toast.error("An error occurred during signup");
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="background-image-signup relative">
        <div className="flex items-center justify-center min-h-screen absolute left-1/2 transform -translate-x-1/2">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[330px] class-width-manage">
            <h2 className="text-2xl font-bold mb-2 text-[#053976] text-center">
              SignUp
            </h2>
            <Formik
              initialValues={{ name: "", email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSignUp}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-4">
                    <label className="block text-[#053976]">Name</label>
                    <Field
                      type="text"
                      name="name"
                      className="w-full px-3 py-2 border-2 border-[#053976] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#053976]">Email</label>
                    <Field
                      type="email"
                      name="email"
                      className="w-full px-3 py-2 border-2 border-[#053976] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
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
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#053976] text-white py-2 rounded-lg hover:bg-[#03163c]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sign Up" : "Sign Up"}
                  </button>
                </Form>
              )}
            </Formik>

            <span className="flex justify-center items-center gap-1 mt-4">
              <span className="text-[12px] text-gray-600">
                Already have an account?
              </span>
              <Link
                to="/login"
                className="text-[12px] font-bold text-[#053976]"
              >
                Log In
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
