const { Schema, model } = require("mongoose");

const Avto = new Schema(
  {
    marka: {
      type: Schema.Types.ObjectId,
      ref: "brand",
      required: true,
    },
    motor: {
      type: Number,
      required: [true, "Motor bo'lishi shart"],
    },
    year: {
      type: Number,
      required: [true, "Salondondan chiqgan yili bo'lishi shart"],
    },
    color: {
      type: String,
      required: [true, "Rangi berilishi shart"],
    },
    gearBook: {
      type: String,
      required: true,
      enum: {
        values: ["automatic", "manual"],
        message: "{VALUE} bunday qiymat qabul qilmaydi",
      },
    },
    tanirofka: {
      type: String,
      required: [true, "Tanirofka tekshirilishi kerak"],
    },
    distance: {
      type: Number,
      required: [true, "Yurgan masofasi berilishi shart"],
    },
    narxi: {
      type: Number,
      required: [true, "Narxi berilishi shart"],
    },
    description: {
      type: String,
      required: [true, "Koment bo'lishi shart"],
    },
    tashqimakonimageUrl: {
      type: String,
      required: [true, "Tashqi korinishini kirgazish kerak kerak"],
    },
    ichkimakonimageUrl: {
      type: String,
      required: [true, "Salon korinishini kirgazish kerak"],
    },
    modelturimageUrl: {
      type: String,
      required: [true, "Model korinishi bo'lishi kerak"],
    },
    clientInfo: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "avto",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const AvtoSchema = model("avto", Avto);
module.exports = AvtoSchema;
