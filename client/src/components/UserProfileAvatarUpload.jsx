/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from "react";
import Axios from "../utils/axios";
import SummaryApi from "../common/api/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { updatedAvatar } from "../store/slices/authSlice";

const UserProfileAvatarUpload = ({ close }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
  };

  const handleUploadAvatarImage = async (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.uploadAvatar,
        data: formData,
      });
      const { data: responseData } = response;
      dispatch(updatedAvatar(responseData.data.avatar));

      toast.success(response.data.message);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 p-4 flex justify-center items-center">
      <div className="bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center">
        <button
          className="text-neutral-800 block w-fit ml-auto"
          onClick={close}
        >
          <IoClose size={25} />
        </button>
        <div className="w-20 h-20   flex justify-center items-center rounded-full overflow-hidden drop-shadow-md">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full" />
          ) : (
            <FaRegUserCircle size={65} />
          )}
        </div>
        <form onSubmit={submitHandler}>
          <label htmlFor="uploadProfile">
            {" "}
            <div className="cursor-pointer text-center text-xs w-20 border border-primary-100 hover:border-primary-200 hover:bg-primary-200 px-3 py-1 rounded-full mt-3">
              {loading ? "loading....." : "Upload"}
            </div>
          </label>
          <input
            onChange={handleUploadAvatarImage}
            type="file"
            id="uploadProfile"
            className="hidden"
          />
        </form>
      </div>
    </section>
  );
};

export default UserProfileAvatarUpload;
