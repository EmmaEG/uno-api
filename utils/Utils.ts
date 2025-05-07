import rateLimit from "express-rate-limit";

export class Utils {
  // Método estático para crear un limitador de solicitudes
  static getRateLimiter(maxRequests: number = 100, minutes: number = 15) {
    return rateLimit({
      windowMs: minutes * 60 * 1000,
      max: maxRequests,
      message: {
        msg: "Demasiadas solicitudes, intente más tarde",
      },
    });
  }
}
