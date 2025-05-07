"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ConfigDB_1 = require("./config/ConfigDB");
const cors = require("cors");
require("dotenv").config();
// create server
const app = (0, express_1.default)();
// data base
ConfigDB_1.ConfigDB.dbConnecttion();
// middlewares
app.use(cors());
app.use(express_1.default.static("public")); // express.static is a middleware to define public directories
app.use(express_1.default.json()); // to process the information that comes in json format
// routes
app.use("/taller/auth", require("./routes/auth"));
app.use("/taller/vehicle", require("./routes/Vehicle"));
// watch to requests
app.listen(process.env.PORT, () => {
    console.log(`server run on port ${process.env.PORT}`);
});
