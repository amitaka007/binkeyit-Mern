import SummaryApi from "../common/api/SummaryApi";
import Axios from "./axios";

const uploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("image", image);

    const response = await Axios({
      ...SummaryApi.uploadImage,
      data: formData,
    });

    return response;
  } catch (error) {
    return {
      message: error.message,
      error: true,
      success: false,
    };
  }
};

export default uploadImage;
