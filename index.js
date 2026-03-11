require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const avtoRouter = require("./router/avto.routes");
const clientRouter = require("./router/client.routes");
const errorMiddleware = require("./middleware/error.middleware");
const authRouter = require("./router/auth.routes");

const connectDb = require("./config/db.config");

connectDb();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// router

app.use(avtoRouter);
app.use(clientRouter);
app.use(errorMiddleware);
app.use(authRouter);

// port
app.listen(PORT, () => {
  console.log("Server is running at: " + PORT);
});
