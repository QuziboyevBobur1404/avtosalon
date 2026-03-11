const CustomErrorHandler = require("../error/custom-error.handler");
const brandSchema = require("../schema/brand.schema");

const getAllBrands = async (req, res, next) => {
  try {
    const brands = await brandSchema.find();

    res.status(200).json(brands);
  } catch (error) {
    next(error);
  }
};

const addBrand = async (req, res, next) => {
  try {
    const { name } = req.body;
    const adminInfo = req.user?.id;

    if (!adminInfo) {
      throw CustomErrorHandler.Forbidden("not authorized");
    }
    await brandSchema.create({ name, adminInfo });

    res.status(201).json({
      message: "Brand added successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBrands,
  addBrand,
};
