const { Schema, model } = require("mongoose");
const { validate } = require("./avto.schema");

const Auth = new Schema({
  username: {
    type: String,
    required: [true, "Username berilishi shart"],
    minLength: [3, "Kamida 3 harfdan iborat bolishi shart"],
    maxLength: [50, "Kopi bilan 50 harfdan iborat bolishi shart"],
    set: (value) => value.trim(),
  },
  email: {
    type: String,
    required: [true, "email bolishi shart"],
  },
  password: {
    type: String,
    required: [true, "password bolishi shart"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  otp: {
    type: String,
    required: true,
  },
  otpTime: {
    type: Number,
    required: true,
  },
});

const AuthSchema = model("auth", Auth);
module.exports = AuthSchema;
