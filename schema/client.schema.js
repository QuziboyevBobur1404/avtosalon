const { Schema, model } = require("mongoose");
const { validate } = require("./avto.schema");

const Client = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "fullName berilishi shart"],
      minLength: [3, "Kamida 3 harfdan iborat bolishi shart"],
      maxLength: [50, "Kopi bilan 50 harfdan iborat bolishi shart"],
      set: (value) => value.trim(),
      // match: /^[a-zA-Z\s]+&/
      match: /^[\p{Lu}][\p{L}'ʻ’]*(?:\s+[\p{Lu}][\p{L}'ʻ’]*)+$/u,
    },
    birthDate: {
      type: Date,
      required: [true, "birthDate bolishi shart"],
    },

    imageUrl: {
      type: String,
      required: [true, "imageUrl bolishi shart"],
    },
    savedCars: [
      {
        type: Schema.Types.ObjectId,
        ref: "avto",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const ClientSchema = model("client", Client);
module.exports = ClientSchema;
