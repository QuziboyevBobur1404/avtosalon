const joi = require("joi");

const carValidator = (data) => {
  const schema = joi.object({
    Marka: joi
      .string()
      .valid("Chevrolet", "Kia", "Lambargini", "Ferrari")
      .required(),
    motor: joi.number().integer().required(),
    year: joi.number().integer().required(),
    color: joi.string().required(),
    gearBook: joi.string().required(),
    tanirofka: joi.string().required(),
    distance: joi.number().integer().required(),
    narxi: joi.number().integer().required(),
    description: joi.string().min(3).max(200).required(),
    tashqimakonimageUrl: joi.string().required(),
    ichkimakonimageUrl: joi.string().required(),
    modelturimageUrl: joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = carValidator;
