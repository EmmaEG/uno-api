import { Schema, model } from "mongoose";

export interface IVehicleClass {
  readonly marca: string;
  readonly patente: string;
  readonly kilometraje: string;
  readonly nMotor: string;
  readonly nChasis: string;
  readonly servicio: string;
  readonly estado: string;
}

class VehicleClass {
  marca: string;
  patente: string;
  kilometraje: string;
  nMotor: string;
  nChasis: string;
  servicio: string;
  estado: string;

  constructor(args: IVehicleClass) {
    this.marca = args.marca;
    this.patente = args.patente;
    this.kilometraje = args.kilometraje;
    this.nMotor = args.nMotor;
    this.nChasis = args.nChasis;
    this.servicio = args.servicio;
    this.estado = args.estado;
  }
}

const vehicleSchema = new Schema<IVehicleClass>(
  {
    marca: { type: String, required: true },
    patente: { type: String, required: true },
    kilometraje: { type: String, required: true },
    nMotor: { type: String, required: true },
    nChasis: { type: String, required: true },
    servicio: { type: String, required: true },
    estado: { type: String, required: true },
  },
  { versionKey: false, toJSON: { virtuals: true }, id: true }
);

vehicleSchema.set("toJSON", {
  virtuals: true,
  transform: function (_doc, ret) {
    delete ret._id; // Delete _id in the answer
  },
});

vehicleSchema.loadClass(VehicleClass);

export const Vehicle = model<IVehicleClass>("Vehicle", vehicleSchema);
