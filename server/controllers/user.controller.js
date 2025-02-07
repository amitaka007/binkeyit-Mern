import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import sendEmail from "../config/sendEmail.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import genertedRefreshToken from "../utils/generatedRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageClodinary.js";
import generatedOtp from "../utils/generatedOtp.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import jwt from "jsonwebtoken";

// 1. register user api
// 2. verify email api
// 3. login user api
// 4. logout user api
// 5. upload avatar api
// 6. upload user details api
// 7. forgot password api
// 8. verify forgotPassword api
// 9. reset Password api
// 10. Refresh token api
// 11. get login user details

export async function registerUserController(req, res) {
  try {
    // mandatatory fields required for register client side
    const { name, email, password } = req.body;

    // if name,email and password is not provided by user
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "provide email,name ,password",
        error: true,
        success: false,
      });
    }

    // check email is already register or not
    const user = await UserModel.findOne({ email });

    // if user already register with this email
    if (user) {
      return res.json({
        message: "Already register email",
        error: true,
        success: false,
      });
    }

    // converting password into hex
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword,
    };

    // send request to database
    const newUser = new UserModel(payload);
    const save = await newUser.save();

    // send email to user for verify email
    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;

    // send email to user
    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Verify email from blinkit",
      html: verifyEmailTemplate({
        name,
        url: verifyEmailUrl,
      }),
    });

    return res.json({
      message: "User register Sucessfully",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// on verify of email
export async function verifyEmailController(req, res) {
  try {
    const { code } = req.body;
    const user = await UserModel.findOne({ _id: code });

    if (!user) {
      return res.status(400).json({
        message: "Invalid code",
        error: true,
        success: false,
      });
    }

    const updateUser = await UserModel.updateOne(
      { _id: code },
      {
        verify_email: true,
      }
    );

    return response.json({
      message: "Email verified successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// login controller
export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    // if email and password is not provided by user
    if (!password || !email) {
      return res.status(400).json({
        message: "Provide email and password",
        error: true,
        success: false,
      });
    }

    // check email id is exisit in database or not
    const user = await UserModel.findOne({ email });

    // if user not found
    if (!user) {
      return res.status(400).json({
        message: "User not registered",
        error: true,
        success: false,
      });
    }

    // check email id is active or suspended
    if (user.status !== "Active") {
      return res.status(400).json({
        message: "Contact to Admin for activation",
        error: true,
        success: false,
      });
    }

    //if the account is active first we have to match the passowrd is same in database
    // we have to dcrpyt it first

    // compare the password
    const checkPassowrd = await bcrypt.compare(password, user.password);

    // if password is not matched
    if (!checkPassowrd) {
      return res.status(400).json({
        message: "Check password",
        error: true,
        success: false,
      });
    }

    // generate access token and refresh token for user account and store in
    // database and send to user in cookies
    //  access token is used to login and refresh token is used to refresh the access token lifespan

    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await genertedRefreshToken(user._id);

    // update user login date
    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      last_login_date: new Date(),
    });

    // set token in cookies
    const cookieOption = {
      httpOnly: true,
      secure: true, //ensures that the cookies are only sent over HTTPS (and not over HTTP). If you're testing in a local development environment that doesn't use HTTPS, this might prevent the cookies from being set or cleared properly.
      sameSite: "None",
      path: "/", // Add this to match the cookie path
    };

    // set token in cookies
    res.cookie("accessToken", accessToken, cookieOption);
    res.cookie("refreshToken", refreshToken, cookieOption);

    return res.json({
      message: "Login successfully",
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// only when login is successfull then we add auth middliware
// Authentication middleware is a critical part of securing your Node.js application, ensuring that users are     properly authenticated before accessing protected resources. It is typically used in:
// User login/authorization processes.
// Restricting access to certain routes based on user identity.
// Implementing custom logic for user permissions (roles, access control).

// logout controller
export async function logoutController(req, res) {
  try {
    const userid = req.userId; //coming from auth middleware
    // console.log(userid,"userid-------------")
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/", // Add this to match the cookie path
    }
    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);


    // remove the refresh token from database
    const removeRefreshTokenUser = await UserModel.findByIdAndUpdate(userid, {
      refresh_token: "",
    });

    return res.json({
      message: "Logout successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//upload user avatar
export async function uploadAvatar(req, res) {
  try {
    const { userId } = req; //coming from auth middleware
    // console.log(req,"!@@2")
    const image = req.file; //coming from multer middleware
    // console.log("image", image);

    // upload avatar to cloudinary
    const upload = await uploadImageCloudinary(image);

    // update the avatar url in database
    const updateUser = await UserModel.findByIdAndUpdate(
      { _id: userId },
      {
        avatar: upload.url,
      }
    );

    return res.json({
      message: "Avatar uploaded successfully",
      error: false,
      success: true,
      data: {
        _id: userId,
        avatar: upload.url,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// update user details
export async function updateUserDetails(request, response) {
  try {
    const userId = request.userId; // comming from auth middleware
    const { name, email, mobile, password } = request.body;

    let hashPassword = "";

    if (password) {
      // converting password into hex
      const salt = await bcrypt.genSalt(10);
      hashPassword = await bcrypt.hash(password, salt);
    }

    // update user details

    // findByIdAndUpdate is used to send the previous data before updating in database
    // updateOne is used to send only the updated data in database

    const updateUser = await UserModel.updateOne(
      { _id: userId },
      {
        ...(name && { name: name }),
        ...(email && { email: email }),
        ...(mobile && { mobile: mobile }),
        ...(password && { password: hashPassword }),
      }
    );

    return response.json({
      message: "Updated User Successfully",
      error: false,
      success: true,
      data: updateUser,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// forgot password Api user has not loggedin
export async function forgotPasswordController(request, response) {
  try {
    const { email } = request.body;

    //check email id is exisit in database or not
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      response.status(400).json({
        message: "Email not Available.",
        error: true,
        success: false,
      });
    }

    const otp = generatedOtp();
    const expireTime = new Date() + 60 * 60 * 1000; // converted into 1 hr otp will expire in 1 hr

    const update = await UserModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: new Date(expireTime).toISOString(),
    });

    await sendEmail({
      sendTo: email,
      subject: "Forgot password from Binkeyit",
      html: forgotPasswordTemplate({
        name: user.name,
        otp: otp,
      }),
    });
    return response.json({
      message: "check your email",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// verify forgot password otp
export async function verifyForgotPasswordOtp(request, response) {
  try {
    const { email, otp } = request.body;

    // if otp and email are not provided by user
    if (!email || !otp) {
      return response.status(400).json({
        message: "Provide the required email, otp",
        error: true,
        success: false,
      });
    }

    //check email id is exisit in database or not
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      response.status(400).json({
        message: "Email not Available.",
        error: true,
        success: false,
      });
    }

    // IF AVAVAILBE THEN
    // we check if the forgot_password_Expiry  is greather than current time

    const currentTime = new Date();

    // means otp is expired
    if (user.forgot_password_expiry < currentTime) {
      return response.status(400).json({
        message: "Otp is expired",
        error: true,
        success: false,
      });
    }

    // otp coming from user side and  otp which is in database both are not matched
    if (otp !== user.forgot_password_otp) {
      return response.status(400).json({
        message: "Invalid otp ",
        error: true,
        success: false,
      });
    }

    // if otp is not expired
    // otp === user.forgot_password_otp

    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      forgot_password_otp: "",
      forgot_password_expiry: "",
    });

    return response.json({
      message: "Verify otp successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// reset the password
export async function resetPassword(request, response) {
  try {
    const { email, newPassword, confirmPassword } = request.body;

    if (!email || !newPassword || !confirmPassword) {
      response.status(400).json({
        message:
          "Please provide the required fileds email,newPassword, confirmPassword",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    // if email is not avilable
    if (!user) {
      response.status(400).json({
        message: "Email is not available",
        error: true,
        success: false,
      });
    }

    // if new passowrd is not same with comfirm password
    if (newPassword !== confirmPassword) {
      response.status(400).json({
        message: "New passowrd and confirm password is not matched",
        error: true,
        success: false,
      });
    }

    // converting password into hex
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    const update = await UserModel.findOneAndUpdate(user._id, {
      password: hashPassword,
    });

    return response.json({
      message: "Password updated successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// refresh token controller
export async function refreshToken(request, response) {
  try {
    // get refresh token from cookies or authorization header
    const refreshToken =
      request.cookies.refreshToken ||
      request?.headers?.authorization?.split(" ", [1]); // [Bearer token]

    // if refresh token is not provided by user
    if (!refreshToken) {
      response.status(401).json({
        message: "  Invalid token  ",
        error: true,
        success: false,
      });
    }

    // console.log(refreshToken,"refreshToken")

    // verify the refresh token
    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );

    // if token is expired
    if (!verifyToken) {
      return response.status(401).json({
        message: "token is expired",
        error: true,
        success: false,
      });
    }

    // console.log(verifyToken,"verifyToken")

    // verify the refresh token
    const userId = verifyToken._id;

    // generate new access token
    const newAccessToken = await generatedAccessToken(userId);
    // set token in cookies
    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    response.cookie("accessToken", newAccessToken, cookieOption);

    return response.json({
      message: "New Access token genrated successfully",
      error: false,
      success: true,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// get login user details
export async function userDetails(request, response) {
  try {
    const userId = request.userId; // get user id from auth middleware
    console.log(userId, "userId");

    // in this i remove the password and refresh token
    const user = await UserModel.findById(userId).select(
      "-password -refresh_token"
    );

    return response.json({
      message: "User details",
      error: false,
      success: true,
      data: user,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
