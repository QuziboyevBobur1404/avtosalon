const CustomErrorHandler = require("../error/custom-error.handler");
const AvtoSchema = require("../schema/avto.schema");
const brandSchema = require("../schema/brand.schema");

const getALLCars = async (req, res) => {
  try {
    const cars = await AvtoSchema.find().populate("marka");

    res.status(200).json(cars);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOneCar = async (req, res) => {
  try {
    const { id } = req.params;
    const foundedCar = await AvtoSchema.findById(id);
    if (!foundedCar) {
      throw CustomErrorHandler.NotFound("Car not found");
    }
    res.status(200).json(foundedCar);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addCar = async (req, res) => {
  try {
    const adminInfo = req.user.id;
    const {
      marka,
      motor,
      year,
      color,
      gearBook,
      distance,
      narxi,
      tanirofka,
      description,
      tashqimakonimageUrl,
      ichkimakonimageUrl,
      modelturimageUrl,
      avtoInfo,
    } = req.body;

    const foundedMarka = await brandSchema.findOne({ name: marka });

    if (!foundedMarka) {
      throw CustomErrorHandler.BadRequest("marka is incorrect");
    }

    await AvtoSchema.create({
      marka: foundedMarka._id,
      motor,
      year,
      color,
      gearBook,
      distance,
      narxi,
      tanirofka,
      description,
      tashqimakonimageUrl,
      ichkimakonimageUrl,
      modelturimageUrl,
      avtoInfo,
      adminInfo,
    });

    res.status(201).json({
      message: "Added new avto",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateCar = async (req, res) => {
  try {
    const {
      Marka,
      motor,
      year,
      color,
      gearBook,
      distance,
      narxi,
      tanirofka,
      description,
      tashqimakonimageUrl,
      ichkimakonimageUrl,
      modelturimageUrl,
      avtoInfo,
    } = req.body;
    const { id } = req.params;
    const foundedCar = await AvtoSchema.findById(id);
    if (!foundedCar) {
      throw CustomErrorHandler.NotFound("Avto not found");
    }

    await AvtoSchema.findByIdAndUpdate(id, {
      Marka,
      motor,
      year,
      color,
      gearBook,
      distance,
      narxi,
      tanirofka,
      description,
      tashqimakonimageUrl,
      ichkimakonimageUrl,
      modelturimageUrl,
      avtoInfo,
    });

    res.status(200).json({
      message: "Updated avto",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const foundedCar = await AvtoSchema.findById(id);
    if (!foundedCar) {
      throw CustomErrorHandler.NotFound("Avto not found");
    }

    await AvtoSchema.findByIdAndDelete(id);

    res.status(200).json({
      message: "Deleted avto",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCarsByBrand = async (req, res, next) => {
  try {
    const { brandId } = req.params;

    const cars = await AvtoSchema.find({
      marka: brandId,
    }).populate("marka");

    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getALLCars,
  getOneCar,
  addCar,
  updateCar,
  deleteCar,
  getCarsByBrand,
};
