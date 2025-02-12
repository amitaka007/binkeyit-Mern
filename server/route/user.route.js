import { Router } from "express";
import {
  forgotPasswordController,
  loginController,
  logoutController,
  refreshToken,
  registerUserController,
  resetPassword,
  updateUserDetails,
  uploadAvatar,
  userDetails,
  verifyEmailController,
  verifyForgotPasswordOtp,  
} from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/verify-email", verifyEmailController);
userRouter.post("/login", loginController);

// auth is used  as only login user is use to use this api  
userRouter.get("/logout", auth, logoutController);
userRouter.put("/upload-avatar", auth, upload.single("avatar"), uploadAvatar);
userRouter.put("/update-user", auth, updateUserDetails);
userRouter.get('/user-details',auth,userDetails)

// flow is used for forgot password
// 1. forgot password controller is used to send otp to email
// 2. verifyForgotPasswordOtp is used to verify otp
// 3. resetPassword is used to reset password
userRouter.put("/forgot-password", forgotPasswordController);
userRouter.put("/verify-forgot-password-otp", verifyForgotPasswordOtp);
userRouter.put("/reset-password", resetPassword);

userRouter.post('/refresh-token',refreshToken)

export default userRouter;