const { Router } = require("express");
const clientValidatorMiddleware = require("../middleware/client.validator.middleware");
const {
  getALLClients,
  getOneClient,
  addClient,
  updateClient,
  deleteClient,
  search,
  saveCar,
  getSavedCars,
  deleteSavedCar,
} = require("../controller/client.controller");

const clientRouter = Router();

clientRouter.get("/get_all_clients", getALLClients);
clientRouter.get("/get_one_client/:id", getOneClient);
clientRouter.get("/search", search);
clientRouter.post("/add_client", clientValidatorMiddleware, addClient);
clientRouter.put("/update_client/:id", updateClient);
clientRouter.delete("/delete_client/:id", deleteClient);
clientRouter.post("/clients/:clientId/save/:carId", saveCar);
clientRouter.get("/clients/:clientId/saved", getSavedCars);
clientRouter.delete("/clients/:clientId/unsave/:carId", deleteSavedCar);
module.exports = clientRouter;
