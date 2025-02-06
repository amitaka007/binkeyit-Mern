import jwt from "jsonwebtoken";
const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1]; // ["Bearer","token"]
    console.log("token", token);

    // Check if token is provided and if not return a token
    if (!token) {
      return res.status(401).json({
        message: "Provide Token",
        error: true,
        success: false,
      });
    }

    // Verify the token and if the token is invalid return an error
    const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

     // Check if token is not valid 
    if (!decode) {
      return res.status(401).json({
        message: "Unauthorized Access",
        error: true,
        success: false,
      });
    }

    // Attach userId to the request object
    req.userId = decode.id;
    console.log(decode, "decode");
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export default auth;
