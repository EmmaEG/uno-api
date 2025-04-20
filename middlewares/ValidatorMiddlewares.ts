import { Request, Response, NextFunction } from "express";
import * as Validators from "express-validator";
import * as JWT from "jsonwebtoken";
import { UserRole } from "../models/Roles.enum";

export interface IPayload {
  id: string;
  name: string;
  role: string;
}

export class ValidatorMiddlewares {
  static fieldValidator = (req: Request, res: Response, next: NextFunction) => {
    const errors = Validators.validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        ok: false,
        errors: errors.mapped(),
      });
    }

    next();
  };

  static jwtValidator = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("x-token");

    if (!token) {
      return res.status(401).send({
        ok: false,
      });
    }

    try {
      const payload = JWT.verify(token, process.env.JWT_KEY!) as IPayload;
      req.body.id = payload.id;
      req.body.name = payload.name;
    } catch (error) {
      return res.status(401).send({
        ok: false,
      });
    }

    next();
  };

  static adminJwtValidator = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.header("x-token");

    if (!token) {
      return res.status(401).send({
        ok: false,
      });
    }

    
    try {
      const payload = JWT.verify(token, process.env.JWT_KEY!) as IPayload;
      if (payload.role !== UserRole.ADMIN) {
        return res.status(403).json({ msg: "Acceso denegado" });
      } 
    } catch (error) {
      return res.status(401).send({
        ok: false,
      });
    }

    next();
  };
}
