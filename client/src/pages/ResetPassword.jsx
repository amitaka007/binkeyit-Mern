import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/axios";
import SummaryApi from "../common/api/SummaryApi";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  console.log("resert", location);

  useEffect(() => {
    // check if the user is coming from the verification otp page
    if (!location?.state?.data?.success) {
      navigate("/");
    }
    // if the user is coming from the verification otp page, then the email is already set in the state
    if (location?.state?.data?.email) {
      setData((prev) => {
        return {
          ...prev,
          email: location?.state?.data?.email,
        };
      });
    }
  }, []);

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

    if (data.confirmPassword !== data.newPassword) {
      toast.error("Password doesn't match");
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.reset_password,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
        setData({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
      console.log(response, "resss");
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className=" w-full container mx-auto px-2 py-10 ">
      <div className="bg-white mx-auto my-4 w-full max-w-lg shadow-lg py-8 rounded-lg px-7">
        <p className="font-semibold  text-lg">Enter Your Password</p>
        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="newPassword">New Password :</label>
            <div className="bg-blue-50 p-2 border focus-within:border-primary-200 rounded flex justify-between items-center">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full"
                value={data.newPassword}
                name="newPassword"
                onChange={handleChange}
                placeholder="Enter your NewPassword"
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
                value={data.confirmPassword}
                name="confirmPassword"
                onChange={handleChange}
                placeholder="Enter your confirm password"
              />
              <div
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="cursor-pointer"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
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
            Change password
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
  );
};

export default ResetPassword;
