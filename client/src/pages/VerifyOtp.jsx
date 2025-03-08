import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPasswordOtp_Async } from "../store/thunk/auth/authThunk";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);
  const location = useLocation();
  //   console.log("location", location.state.email);

  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgot-password");
    }
  }, []);

  const validvalue = data.every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        otp: data.join(""),
        email: location.state?.email,
      };
      const response = await dispatch(forgotPasswordOtp_Async(payload)); 

      if (response?.payload?.error) {
        toast.error(response.payload.response.data.message);
      }
      if (response?.payload) {
        toast.success(response.payload.message || "OTP verified successfully.");
        setData(["", "", "", "", "", ""]);
        navigate("/reset-password", {
          state: {
            data: response?.payload,
            email: location.state?.email,
          },
        });
      }
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    }
  };

  return (
    <>
      <section className=" w-full container mx-auto px-2 py-10 ">
        <div className="bg-white mx-auto my-4 w-full max-w-lg shadow-lg py-8 rounded-lg px-7">
          <p className="font-semibold  text-lg">Enter OTP </p>
          <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
            <div className="grid gap-1">
              <label htmlFor="otp">Enter Your OTP :</label>
              <div className="flex items-center gap-2 justify-between mt-3 ">
                {data.map((element, index) => {
                  return (
                    <input
                      key={"otp" + index}
                      ref={(ref) => {
                        inputRef.current[index] = ref;
                        return ref;
                      }}
                      value={data[index]}
                      onChange={(e) => {
                        const value = e.target.value;
                        const newData = [...data];
                        newData[index] = value;
                        setData(newData);

                        if (value && index < 5) {
                          inputRef.current[index + 1].focus();
                        }
                      }}
                      maxLength={1}
                      type="text"
                      className="text-center font-semibold bg-blue-50 p-2 border w-full max-w-16 rounded  outline-none focus:border-primary-200"
                    />
                  );
                })}
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
              Verify Otp
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

export default VerifyOtp;
