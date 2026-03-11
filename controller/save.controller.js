const CustomErrorHandler = require("../error/custom-error.handler");
const AuthSchema = require("../schema/auth.schema");
const AvtoSchema = require("../schema/avto.schema");

const saveCar = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { carId } = req.params;
    console.log("carId:", carId);
    const user = await AuthSchema.findById(userId);

    if (!user) {
      throw CustomErrorHandler.NotFound("user not found");
    }

    const car = await AvtoSchema.findById(carId);
    console.log("car:", car);
    if (!car) {
      throw CustomErrorHandler.NotFound("car not found");
    }

    if (user.savedCars.includes(carId)) {
      throw CustomErrorHandler.BadRequest("car already saved");
    }

    user.savedCars.push(carId);

    await user.save();

    res.status(200).json({
      message: "car saved",
    });
  } catch (error) {
    next(error);
  }
};

const getSavedCars = async (req, res, next) => {
  try {
    const user = await AuthSchema.findById(req.user.id).populate("savedCars");

    if (!user) {
      throw CustomErrorHandler.NotFound("user not found");
    }

    res.status(200).json(user.savedCars);
  } catch (error) {
    next(error);
  }
};

const deleteSavedCar = async (req, res, next) => {
  try {
    const { carId } = req.params;

    const user = await AuthSchema.findById(req.user.id);

    if (!user) {
      throw CustomErrorHandler.NotFound("user not found");
    }

    user.savedCars = user.savedCars.filter((id) => id.toString() !== carId);

    await user.save();

    res.status(200).json({
      message: "car removed",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  saveCar,
  getSavedCars,
  deleteSavedCar,
};
