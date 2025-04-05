import express from "express";
import { ConfigDB } from "./config/ConfigDB";
const cors = require("cors");
require("dotenv").config();

// create server
const app = express();

// data base
ConfigDB.dbConnecttion();

// middlewares
app.use(cors());
app.use(express.static("public")); // express.static es un middleware que se usa para definir directorios publicos
app.use(express.json()); // to process the information that comes in json format

// routes
app.use("/taller/auth", require("./routes/auth"));
app.use("/taller/vehicle", require("./routes/Vehicle"));

// watch to requests
app.listen(process.env.PORT, () => {
  console.log(`server run on port ${process.env.PORT}`);
}); 

