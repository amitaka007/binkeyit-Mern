import { useState } from "react";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPaswordAsync } from "../store/thunk/auth/authThunk";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
  });

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
    try {
      const response = await dispatch(forgotPaswordAsync(data)); 

      if (response.payload.error) {
        toast.error(response.payload.message);
      }
      if (response.payload.success) {
        toast.success(response.payload.message);
        navigate("/verification-otp", {
          state: {
            email: data.email,
          },
        });
        setData({
          email: "",
        });
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
          <p className="font-semibold  text-lg">Forgot Password</p>
          <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
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

            <button
              disabled={!validvalue}
              type="submit"
              className={`  text-white py-2 rounded  ${
                validvalue
                  ? "bg-green-800 hover:bg-green-600 "
                  : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              Send OTP
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

export default ForgotPassword;
