"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleController = void 0;
const VehicleClass_1 = require("../models/VehicleClass");
class VehicleController {
}
exports.VehicleController = VehicleController;
_a = VehicleController;
VehicleController.getVehicles = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicles = yield VehicleClass_1.Vehicle.find();
        res.status(200).json(vehicles);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "No se pudieron obtener los vehículos",
        });
    }
});
VehicleController.createVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = new VehicleClass_1.Vehicle(req.body);
    try {
        const savedVehicle = yield vehicle.save();
        res.status(201).json(savedVehicle);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "No se pudo grabar el vehículo",
        });
    }
});
VehicleController.updateVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicleId = req.params.id;
    try {
        const vehicle = yield VehicleClass_1.Vehicle.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json({
                msg: "El Vehiculo no existe",
            });
        }
        const newVehicle = Object.assign({}, req.body);
        const vehicleUpdated = yield VehicleClass_1.Vehicle.findByIdAndUpdate(vehicleId, newVehicle, {
            new: true, // new ture to get the vehicle updated in the response, because in the db updated correctly
        });
        res.status(200).json(vehicleUpdated);
    }
    catch (error) {
        res.status(500).json({
            msg: "Hable con el Administrador",
        });
    }
});
VehicleController.deleteVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicleId = req.params.id;
    try {
        const vehicle = yield VehicleClass_1.Vehicle.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json({
                msg: "El vehículo no existe",
            });
        }
        yield VehicleClass_1.Vehicle.findByIdAndDelete(vehicle);
        res.sendStatus(200);
    }
    catch (error) {
        res.status(500).json({
            msg: "Hable con el Administrador",
        });
    }
});
