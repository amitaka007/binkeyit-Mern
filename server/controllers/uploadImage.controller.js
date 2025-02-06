import uploadImageCloudinary from "../utils/uploadImageClodinary.js";

const uploadImageController = async (request, response) => {
  try {
    const file = request.file;
    if (!file) {
      return response.status(400).json({
        message: "Please upload a file",
        error: true,
        success: false,
      });
    }

    const uploadImage = await uploadImageCloudinary(file);

    return response.status(200).json({
      message: "Image uploaded successfully",
      error: false,
      success: true,
      data: uploadImage,
    });

    console.log(file), "filefile";
  } catch (error) {
    return response.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

export default uploadImageController;
