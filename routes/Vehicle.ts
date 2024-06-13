import { Router } from "express";
import { VehicleController } from "../controllers/VehicleController";

/*
    Vehicles Routes
    host + /taller/vehicle
*/
const router = Router();

router.get("/", VehicleController.getVehicles);

router.post("/", VehicleController.createVehicle);

router.put("/:id", VehicleController.updateVehicle);

router.delete("/:id", VehicleController.deleteVehicle);

module.exports = router;
