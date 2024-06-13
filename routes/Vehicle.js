"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VehicleController_1 = require("../controllers/VehicleController");
/*
    Vehicles Routes
    host + /taller/vehicle
*/
const router = (0, express_1.Router)();
router.get("/", VehicleController_1.VehicleController.getVehicles);
router.post("/", VehicleController_1.VehicleController.createVehicle);
router.put("/:id", VehicleController_1.VehicleController.updateVehicle);
router.delete("/:id", VehicleController_1.VehicleController.deleteVehicle);
module.exports = router;
