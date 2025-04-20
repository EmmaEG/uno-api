import { Router } from "express";
import { VehicleController } from "../controllers/VehicleController";
import { ValidatorMiddlewares } from "../middlewares/ValidatorMiddlewares";

/*
    Vehicles Routes
    host + /taller/vehicle
*/
const router = Router();

router.use(ValidatorMiddlewares.jwtValidator); // to apply to all routes below

router.get("/", VehicleController.getVehicles);

router.post("/", VehicleController.createVehicle);

router.put("/:id", VehicleController.updateVehicle);

router.delete("/:id", ValidatorMiddlewares.adminJwtValidator, VehicleController.deleteVehicle);

module.exports = router;
