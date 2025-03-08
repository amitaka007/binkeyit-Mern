import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerAsync } from "../store/thunk/auth/authThunk";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const validvalue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      toast.error("Password doesn't match");
      return;
    }
    try {
      const response = await dispatch(registerAsync(data));
      console.log(response, "registerAsync");

      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
      console.log(response, "resss");
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <>
      <section className=" w-full container mx-auto px-2 py-10 ">
        <div className="bg-white mx-auto my-4 w-full max-w-lg shadow-lg py-8 rounded-lg px-7">
          <p>Welcome to Bikeyit</p>
          <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
            <div className="grid gap-1">
              <label htmlFor="name">Name :</label>
              <input
                type="text"
                autoFocus
                className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200"
                value={data.name}
                name="name"
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                className="bg-blue-50 p-2 border rounded  outline-none focus:border-primary-200"
                value={data.email}
                name="email"
                onChange={handleChange}
                placeholder="Enter your Email"
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="password">Password :</label>
              <div className="bg-blue-50 p-2 border focus-within:border-primary-200 rounded flex justify-between items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full"
                  value={data.password}
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
            </div>
            <div className="grid gap-1">
              <label htmlFor="confirmPassword">Confirm Password :</label>
              <div className="bg-blue-50 p-2 border focus-within:border-primary-200 rounded flex justify-between items-center">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full"
                  id="confirmPassword"
                  value={data.confirmPassword}
                  name="confirmPassword"
                  onChange={handleChange}
                  placeholder="Enter your confirm password"
                />
                <div
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="cursor-pointer"
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
            </div>
            <button
              disabled={!validvalue}
              type="submit"
              className={`  text-white py-2 rounded  ${
                validvalue
                  ? "bg-green-800 hover:bg-green-600 "
                  : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              Register
            </button>
          </form>

          <p>
            Already have an Account ?{" "}
            <Link
              to={"/login"}
              className="font-bold text-secondary-200 hover:text-green-900"
            >
              Login
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Register;
