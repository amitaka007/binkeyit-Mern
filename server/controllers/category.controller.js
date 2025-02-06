import CategoryModel from "../models/category.model.js";

export const AddCategoryController = async (request, response) => {
  try {
    const { name, image } = request.body;

    if (!name || !image) {
      return response.status(400).json({
        message: "Please fill all fields",
        error: true,
        success: false,
      });
    }

    const addCategory = new CategoryModel({
      name,
      image,
    });

    const saveCategory = await addCategory.save();

    if (!saveCategory) {
      return response.status(400).json({
        message: "Category not added",
        error: true,
        success: false,
      });
    }

    return response.json({
      message: "Category added successfully",
      error: false,
      success: true,
      data: saveCategory,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

export const getCategoryController = async (request, response) => {
  try {
    const data = await CategoryModel.find()

    return response.json({
      message: "Category fetched successfully",
      error: false,
      success: true,
      data: data,
    });
  
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
