"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VehicleController_1 = require("../controllers/VehicleController");
const ValidatorMiddlewares_1 = require("../middlewares/ValidatorMiddlewares");
/*
    Vehicles Routes
    host + /taller/vehicle
*/
const router = (0, express_1.Router)();
router.use(ValidatorMiddlewares_1.ValidatorMiddlewares.jwtValidator); // to apply to all routes below
router.get("/", VehicleController_1.VehicleController.getVehicles);
router.post("/", VehicleController_1.VehicleController.createVehicle);
router.put("/:id", VehicleController_1.VehicleController.updateVehicle);
router.delete("/:id", VehicleController_1.VehicleController.deleteVehicle);
module.exports = router;
