const { Router } = require("express");
const {
  getALLCars,
  getOneCar,
  addCar,
  updateCar,
  deleteCar,
  getCarsByBrand,
} = require("../controller/avto.controller");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const avtoRouter = Router();

avtoRouter.get("/get_all_cars", getALLCars);
avtoRouter.get("/get_one_car/:id", getOneCar);
avtoRouter.post("/add_car", authMiddleware, roleMiddleware(["admin"]), addCar);
avtoRouter.put(
  "/update_car/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  updateCar,
);
avtoRouter.delete(
  "/delete_car/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteCar,
);
avtoRouter.get("/cars/brand/:brandId", getCarsByBrand);
module.exports = avtoRouter;
