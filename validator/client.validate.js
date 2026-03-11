const joi = require("joi");

const clientValidator = (data) => {
  const schema = joi.object({
    fullName: joi
      .string()
      .min(3)
      .max(50)
      .pattern(new RegExp(/^[\p{Lu}][\p{L}'ʻ’]*(?:\s+[\p{Lu}][\p{L}'ʻ’]*)+$/u))
      .required(),
    birthDate: joi.date().required(),

    imageUrl: joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = clientValidator;
