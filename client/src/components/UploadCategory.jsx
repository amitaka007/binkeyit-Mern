/* eslint-disable react/prop-types */

import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Skeleton from "react-loading-skeleton"; // Import Skeleton
import uploadImage from "../utils/uploadImage";
import Axios from "../utils/axios";
import SummaryApi from "../common/api/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const UploadCategory = ({ close }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false); // To handle image loading

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.addCategory,
        data: data,
      });

      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        close();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please select an image.");
      return;
    }
    

    setImageLoading(true); // Start image loading

    try {
      const response = await uploadImage(file);
      if (response && response.data) {
        const { data: ImageResponse } = response;

        setData((prev) => {
          return {
            ...prev,
            image: ImageResponse.data.url,
          };
        });
      } else {
        // If the response doesn't have data, log or show an error
        console.error("Invalid response structure:", response);
        toast.error("Image upload failed. Please try again.");
      }
    } catch (error) {
      AxiosToastError(error);
      toast.error("An error occurred during image upload. Please try again.");
    } finally {
      setImageLoading(false); // Start image loading
    }
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 p-4 flex justify-center items-center">
      <div className="bg-white max-w-4xl w-full rounded p-4 ">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Category</h1>
          <button
            className="border  w-fit block ml-auto  font-semibold hover:bg-primary-100 border-primary-100 text-primary-200 hover:text-neutral-800 rounded"
            onClick={close}
          >
            <IoClose size={25} />
          </button>
        </div>

        <form className="my-3 grid gap-2" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label id="categoryName">Name</label>
            <input
              type="text"
              id="categoryName"
              placeholder="Enter Category Name"
              value={data.name}
              name="name"
              onChange={handleChange}
              className="p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>
          <div className="grid gap-1">
            <p>Image</p>
            <div className="flex gap-3 flex-col lg:flex-row items-center">
              <div className="flex items-center justify-center rounded border bg-blue-50 h-36 w-full lg:w-36">
                {imageLoading ? ( // If image is loading, show skeleton
                  <Skeleton height="100%" width="100%" />
                ) : data.image ? (
                  <img
                    alt="category"
                    src={data.image}
                    className="h-full w-full object-scale-down"
                  />
                ) : (
                  <p className="text-sm text-neutral-500">No Image</p>
                )}
              </div>
              <label htmlFor="uploadCategoryImage">
                <div
                  className={` ${
                    !data.name
                      ? "bg-gray-300"
                      : "border-primary-200 hover:bg-primary-100"
                  } px-4 py-2 rounded cursor-pointer border  font-medium`}
                >
                  Upload Image
                </div>
                <input
                  disabled={!data.name}
                  type="file"
                  id="uploadCategoryImage"
                  className="hidden"
                  onChange={handleUploadCategoryImage}
                />
              </label>
            </div>
          </div>

          <button
            className={`${
              data.name && data.image
                ? "bg-primary-200 hover:bg-primary-100"
                : "bg-gray-300"
            } py-2 font-semibold`}
          >
            {loading ? <Skeleton width={100} height={20} /> : "Add Category"}{" "}
            {/* Show skeleton on button if loading */}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadCategory;
