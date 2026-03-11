const CustomErrorHandler = require("../error/custom-error.handler");
const ClientSchema = require("../schema/client.schema");
const AvtoSchema = require("../schema/avto.schema");

const getALLClients = async (req, res, next) => {
  try {
    const clients = await ClientSchema.find();

    res.status(200).json(clients);
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  try {
    const { searchingValue } = req.query;
    const result = await ClientSchema.find({
      fullName: { $regex: searchingValue, $options: "i" },
      // birthDate: { $eq: searchingValue },
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getOneClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundedClient = await ClientSchema.findById(id);
    if (!foundedClient) {
      throw CustomErrorHandler.NotFound("client not found");
    }
    res.status(200).json(foundedClient);
  } catch (error) {
    next(error);
  }
};

const addClient = async (req, res, next) => {
  try {
    const { fullName, birthDate, imageUrl, clientInfo } = req.body;

    await ClientSchema.create({
      fullName,
      birthDate,
      imageUrl,
      clientInfo,
    });

    res.status(201).json({
      message: "Added new client",
    });
  } catch (error) {
    next(error);
  }
};

const updateClient = async (req, res, next) => {
  try {
    const { fullName, birthDate, imageUrl, clientInfo } = req.body;
    const { id } = req.params;
    const foundedClient = await ClientSchema.findById(id);
    if (!foundedClient) {
      throw CustomErrorHandler.NotFound("client not found");
    }

    await ClientSchema.findByIdAndUpdate(id, {
      fullName,
      birthDate,
      imageUrl,
      clientInfo,
    });

    res.status(200).json({
      message: "Updated client",
    });
  } catch (error) {
    next(error);
  }
};

const deleteClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundedClient = await ClientSchema.findById(id);
    if (!foundedClient) {
      throw CustomErrorHandler.NotFound("client not found");
    }

    await ClientSchema.findByIdAndDelete(id);

    res.status(200).json({
      message: "Deleted client",
    });
  } catch (error) {
    next(error);
  }
};

const saveCar = async (req, res, next) => {
  try {
    const { clientId, carId } = req.params;

    const client = await ClientSchema.findById(clientId);

    if (!client) {
      throw CustomErrorHandler.NotFound("client not found");
    }

    const car = await AvtoSchema.findById(carId);

    if (!car) {
      throw CustomErrorHandler.NotFound("car not found");
    }

    if (client.savedCars.includes(carId)) {
      throw CustomErrorHandler.BadRequest("car already saved");
    }

    client.savedCars.push(carId);

    await client.save();

    res.status(200).json({
      message: "Car saved successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getSavedCars = async (req, res, next) => {
  try {
    const { clientId } = req.params;

    const client = await ClientSchema.findById(clientId).populate("savedCars");

    if (!client) {
      throw CustomErrorHandler.NotFound("client not found");
    }

    res.status(200).json(client.savedCars);
  } catch (error) {
    next(error);
  }
};

const deleteSavedCar = async (req, res, next) => {
  try {
    const { clientId, carId } = req.params;

    const client = await ClientSchema.findById(clientId);

    if (!client) {
      throw CustomErrorHandler.NotFound("client not found");
    }

    client.savedCars = client.savedCars.filter((id) => id.toString() !== carId);

    await client.save();

    res.status(200).json({
      message: "Car removed from saved list",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getALLClients,
  getOneClient,
  addClient,
  updateClient,
  deleteClient,
  search,
  saveCar,
  getSavedCars,
  deleteSavedCar,
};
