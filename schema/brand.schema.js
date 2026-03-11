const { Schema, model } = require("mongoose");

const Brand = new Schema(
  {
    name: {
      type: String,
      required: [true, "Brand name required"],
      // unique: true,
      trim: true,
    },
    adminInfo: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "auth",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = model("brand", Brand);
