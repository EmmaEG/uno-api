"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = void 0;
const mongoose_1 = require("mongoose");
class VehicleClass {
    constructor(args) {
        this.marca = args.marca;
        this.patente = args.patente;
        this.kilometraje = args.kilometraje;
        this.nMotor = args.nMotor;
        this.nChasis = args.nChasis;
        this.servicio = args.servicio;
        this.estado = args.estado;
    }
}
const vehicleSchema = new mongoose_1.Schema({
    marca: { type: String, required: true },
    patente: { type: String, required: true },
    kilometraje: { type: String, required: true },
    nMotor: { type: String, required: true },
    nChasis: { type: String, required: true },
    servicio: { type: String, required: true },
    estado: { type: String, required: true },
}, { versionKey: false, toJSON: { virtuals: true }, id: true });
vehicleSchema.set("toJSON", {
    virtuals: true,
    transform: function (_doc, ret) {
        delete ret._id; // Delete _id in the answer
    },
});
vehicleSchema.loadClass(VehicleClass);
exports.Vehicle = (0, mongoose_1.model)("Vehicle", vehicleSchema);
