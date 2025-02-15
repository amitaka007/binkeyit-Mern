import Axios from "../../../utils/axios";

  export const fetchAllCategory = (data) => {
    Axios.request({
      url: "api/category/get",
      method: "GET",
      data,
      withCredentials: true,
    });
  };
  