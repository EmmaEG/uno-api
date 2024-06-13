import { Request, Response } from "express";
import { Vehicle } from "../models/VehicleClass";

export class VehicleController {
  static getVehicles = async (_req: Request, res: Response) => {
    try {
      const vehicles = await Vehicle.find();
      res.status(200).json(vehicles);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "No se pudieron obtener los vehículos",
      });
    }
  };

  static createVehicle = async (req: Request, res: Response) => {
    const vehicle = new Vehicle(req.body);
    try {
      const savedVehicle = await vehicle.save();
      res.status(201).json(savedVehicle);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "No se pudo grabar el vehículo",
      });
    }
  };

  static updateVehicle = async (req: Request, res: Response) => {
    const vehicleId = req.params.id;

    try {
      const vehicle = await Vehicle.findById(vehicleId);

      if (!vehicle) {
        return res.status(404).json({
          msg: "El Vehiculo no existe",
        });
      }

      const newVehicle = {
        ...req.body,
      };

      const vehicleUpdated = await Vehicle.findByIdAndUpdate(
        vehicleId,
        newVehicle,
        {
          new: true, // new ture to get the vehicle updated in the response, because in the db updated correctly
        }
      );

      res.status(200).json(vehicleUpdated);
    } catch (error) {
      res.status(500).json({
        msg: "Hable con el Administrador",
      });
    }
  };

  static deleteVehicle = async (req: Request, res: Response) => {
    const vehicleId = req.params.id;

    try {
      const vehicle = await Vehicle.findById(vehicleId);

      if (!vehicle) {
        return res.status(404).json({
          msg: "El vehículo no existe",
        });
      }

      await Vehicle.findByIdAndDelete(vehicle);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({
        msg: "Hable con el Administrador",
      });
    }
  };
}
