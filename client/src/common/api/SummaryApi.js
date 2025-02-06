export const baseUrl = "http://localhost:8080";

const SummaryApi = {
  register: {
    url: `${baseUrl}/api/user/register`,
    method: "POST",
  },
  // login: {
  //   url: `${baseUrl}/api/user/login`,
  //   method: "POST",
  // },
  forgot_Password: {
    url: `${baseUrl}/api/user/forgot-password`,
    method: "PUT",
  },
  forgot_Password_Otp: {
    url: `${baseUrl}/api/user/verify-forgot-password-otp`,
    method: "PUT",
  },
  reset_password: {
    url: `${baseUrl}/api/user/reset-password`,
    method: "PUT",
  },
  refreshToken: {
    url: `${baseUrl}/api/user/refresh-token`,
    method: "POST",
  },
  userDetails: {
    url: `${baseUrl}/api/user/user-details`,
    method: "GET",
  },
  logout: {
    url: `${baseUrl}/api/user/logout`,
    method: "GET",
  },
  uploadAvatar: {
    url: `${baseUrl}/api/user/upload-avatar`,
    method: "PUT",
  },
  updateUserDetails: {
    url: `${baseUrl}/api/user/update-user `,
    method: "PUT",
  },
  uploadImage: {
    url: `${baseUrl}/api/file/upload`,
    method: "POST",
  },
  addCategory: {
    url: `${baseUrl}/api/category/add-category`,
    method: "POST",
  },
  getCategory: {
    url: `${baseUrl}/api/category/get`,
    method: "GET",
  },
};

export default SummaryApi;
