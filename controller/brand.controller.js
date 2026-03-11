const BrandSchema = require("../schema/brand.schema");

const getAllBrands = async (req, res, next) => {
  try {
    const brands = await BrandSchema.find();

    res.status(200).json(brands);
  } catch (error) {
    next(error);
  }
};

const addBrand = async (req, res, next) => {
  try {
    const { name } = req.body;

    await BrandSchema.create({ name });

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
