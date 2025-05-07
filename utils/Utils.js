"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
class Utils {
    // Método estático para crear un limitador de solicitudes
    static getRateLimiter(maxRequests = 100, minutes = 15) {
        return (0, express_rate_limit_1.default)({
            windowMs: minutes * 60 * 1000,
            max: maxRequests,
            message: {
                msg: "Demasiadas solicitudes, intente más tarde",
            },
        });
    }
}
exports.Utils = Utils;
