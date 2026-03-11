const { Router } = require("express");

const { getAllBrands, addBrand } = require("../controller/brand.controller");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const brandRouter = Router();

brandRouter.get("/brands", getAllBrands);

brandRouter.post(
  "/brands",
  authMiddleware,
  roleMiddleware(["admin"]),
  addBrand,
);

module.exports = brandRouter;
