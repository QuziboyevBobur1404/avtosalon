const CustomErrorHandler = require("../error/custom-error.handler");
const AuthSchema = require("../schema/auth.schema");

const bcrypt = require("bcryptjs");
const sendMessage = require("../utils/send-email");
const { date } = require("joi");
const { access_token, refresh_token } = require("../utils/jwt");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const foundedUser = await AuthSchema.findOne({ email });

    if (foundedUser) {
      throw CustomErrorHandler.BadRequest("User already exsist");
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const code = Array.from({ length: 6 }, () =>
      Math.round(Math.random() * 6),
    ).join("");

    await sendMessage(code, email);

    await AuthSchema.create({
      username,
      email,
      password: hashPassword,
      otp: code,
      otpTime: Date.now() + 120000,
    });

    res.status(200).json({ message: "registered" });
  } catch (error) {
    next(error);
  }
};

const verify = async (req, res, next) => {
  try {
    const { email, code } = req.body;

    const foundedUser = await AuthSchema.findOne({ email });

    if (!foundedUser) {
      throw CustomErrorHandler.BadRequest("User not found");
    }
    if (!foundedUser.otp) {
      throw CustomErrorHandler.UnAuthorized("otp not found");
    }

    if (foundedUser.otp !== code) {
      throw CustomErrorHandler.UnAuthorized("wrong otp");
    }

    if (foundedUser.otpTime < Date.now()) {
      throw CustomErrorHandler.UnAuthorized("otp expired");
    }
    //  await sendMessage(code, email)

    //  await AuthSchema.create({
    //   username,
    //   email,
    //   password: hashPassword,
    //   otp: code,
    //   otpTime: Date.now() + 120000
    //  })
    await AuthSchema.findOneAndUpdate(foundedUser._id, { otp: "", otpTime: 0 });

    const accessToken = access_token({
      id: foundedUser._id,
      role: foundedUser.role,
      email: foundedUser.email,
    });
    const refreshToken = refresh_token({
      id: foundedUser._id,
      role: foundedUser.role,
      email: foundedUser.email,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true, // XSS(CROSS-SITE-SCRIPTING)
      secure: true, // https
      sameSite: "strict", // CSRF
      maxAge: 900000,
    });
    res.status(200).json({
      message: "succes",
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  verify,
};
