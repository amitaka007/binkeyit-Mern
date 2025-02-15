import Axios from "../../../utils/axios";

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

export const register = (data) =>
  Axios.request({
    url: "api/user/register",
    method: "POST",
    data,
  });  
export const forgot_Password = (data) =>
  Axios.request({
    url: "api/user/forgot-password",
    method: "PUT",
    data,
  });

export const forgot_Password_Otp = (data) =>
  Axios.request({
    url: "api/user/verify-forgot-password-otp",
    method: "PUT",
    data,
  });

export const reset_password = (data) =>
  Axios.request({
    url: "api/user/reset_password",
    method: "PUT",
    data,
  });
export const refreshToken = (data) =>
  Axios.request({
    url: "api/user/refresh-token",
    method: "POST",
    data,
  });