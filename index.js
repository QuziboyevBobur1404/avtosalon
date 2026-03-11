require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const avtoRouter = require("./router/avto.routes");
const saveRouter = require("./router/save.routes");
const errorMiddleware = require("./middleware/error.middleware");
const authRouter = require("./router/auth.routes");

const connectDb = require("./config/db.config");
const brandRouter = require("./router/brand.routes");

connectDb();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// router

app.use(avtoRouter);
app.use(brandRouter);
app.use("/save", saveRouter);
app.use("/auth", authRouter);

app.use(errorMiddleware);
// port
app.listen(PORT, () => {
  console.log("Server is running at: " + PORT);
});
