const { Router } = require("express");

const {
  saveCar,
  getSavedCars,
  deleteSavedCar,
} = require("../controller/save.controller");

const authMiddleware = require("../middleware/auth.middleware");

const saveRouter = Router();

saveRouter.post("/save/:carId", authMiddleware, saveCar);

saveRouter.get("/saved", authMiddleware, getSavedCars);

saveRouter.delete("/unsave/:carId", authMiddleware, deleteSavedCar);

module.exports = saveRouter;
