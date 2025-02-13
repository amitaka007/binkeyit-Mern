import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AxiosToastError from "../utils/AxiosToastError";
import { useNavigate, Link } from "react-router-dom";
import fetchUserDetails from "../utils/fetchUserDetails";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { LoginFormSchema } from "../utils/FormSchema";
import { userLogin } from "../store/thunk/auth/authThunk";
import { setUserDetails } from "../store/slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector((state) => state?.authSlice?.userDetails);

  const formInitialValues = {
    email: "",
    password: "",
  };

  const { handleChange, handleSubmit, values, errors, touched, resetForm } =
    useFormik({
      initialValues: formInitialValues,
      validationSchema: LoginFormSchema,
      onSubmit: async (values) => {
        try {
          const response = await dispatch(userLogin(values));

          if (response?.payload) {
            const userDetails = await fetchUserDetails();

            // Dispatch the user details to Redux store
            dispatch(setUserDetails(userDetails.data));

            // Reset form fields
            resetForm();

            // navigate("/"); // Redirect to home page or dashboard
          }
        } catch (error) {
          AxiosToastError(error);
        }
      },
    });

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, [user]);
  return (
    <>
      <section className=" w-full container mx-auto px-2 pb-10 ">
        <div className="bg-white mx-auto my-4 w-full max-w-lg shadow-lg py-8 rounded-lg px-7">
          <p>Login </p>
          <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
            <div className="grid gap-1">
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                className={`bg-blue-50 p-2 border rounded  outline-none focus:border-primary-200 ${
                  errors.email && touched.email ? "border-red-500" : ""
                }`}
                value={values.email}
                name="email"
                onChange={handleChange}
                placeholder="Enter your Email"
              />
              {errors.email && touched.email && (
                <div className="text-red-500 text-sm">{errors.email}</div>
              )}
            </div>
            <div className="grid gap-1">
              <label htmlFor="password">Password :</label>
              <div className="bg-blue-50 p-2 border focus-within:border-primary-200 rounded flex justify-between items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full"
                  value={values.password}
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
              {errors.password && touched.password && (
                <div className="text-red-500 text-sm">{errors.password}</div>
              )}
              <div className="text-right text-sm text-gray-600 mt-2 ">
                <Link to="/forgot-password">Forgot Password ?</Link>
              </div>
            </div>
            <button
              type="submit"
              className={`text-white py-2 rounded ${
                !values.email || !values.password
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-green-800 hover:bg-green-600"
              }`}
              disabled={!values.email || !values.password}
            >
              Login
            </button>
          </form>

          <div className="mt-4">
            <a href="#" className="block">
              <button className="w-full text-center py-2 my-3 border flex items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  className="w-5 h-5 mr-2"
                  alt="Google Icon"
                />
                <span className="dark:text-gray-300">Login with Google</span>
              </button>
            </a>

            {/* <a href="#" className="block">
              <button className="w-full text-center py-2 my-3 border flex items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5 mr-2 dark:text-white"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="dark:text-gray-300">Login with Github</span>
              </button>
            </a> */}
          </div>

          <p>
            Create an Account ?{" "}
            <Link
              to={"/register"}
              className="font-bold text-secondary-200 hover:text-green-900"
            >
              Sign In
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Login;
