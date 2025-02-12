import Axios from "../../utils/axios";

export const login = (data) =>
  Axios.request({
    url: "api/user/login",
    method: "POST",
    data,
  });

export const logout = (data) => {
  Axios.request({
    url: "api/user/logout",
    method: "GET",
    data,
    withCredentials: true,
  });
};
