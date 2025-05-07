import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import * as Validators from "express-validator";
import { ValidatorMiddlewares } from "../middlewares/ValidatorMiddlewares";
import { Utils } from "../utils/Utils";

/*
    Users Routes
    host + /taller/auth
*/
const router = Router();
const authLimiter = Utils.getRateLimiter(10, 15);

router.post(
  "/register",
  authLimiter,
  [
    Validators.check("name", "El nombre es obligatorio")
      .notEmpty()
      .trim()
      .escape() // convert scripts in text
      .isAlpha("es-ES", { ignore: " " })
      .withMessage("El nombre solo puede contener letras y espacios"),

    Validators.check("email", "El email es obligatorio")
      .isEmail()
      .normalizeEmail()
      .trim()
      .escape(),

    Validators.check("password", "El password debe tener 6 caracteres como mínimo")
      .isLength({ min: 6 })
      .trim()
      .escape(),

    ValidatorMiddlewares.fieldValidator,
    ValidatorMiddlewares.adminJwtValidator,
  ],
  AuthController.createUser
);

router.post(
  "/",
  authLimiter,
  [
    Validators.check("email", "El email es obligatorio")
    .isEmail()
    .normalizeEmail()
    .trim()
    .escape(),

    Validators.check("password", "El password debe tener 6 caracteres como mínimo")
    .isLength({ min: 6 })
    .trim()
    .escape(),
    ValidatorMiddlewares.fieldValidator,
  ],
  AuthController.loginUser
);

router.get(
  "/renew",
  ValidatorMiddlewares.jwtValidator,
  AuthController.renewToken
);

module.exports = router;

/*
router.post("/register", [] ,AuthController.createUser);
como segundo argumento de mi funcion puedo poner un middleware o varios, como voy a usar mas de uno lo paso en un array

check: sirve para validar un campo en particular, y lo hace de uno a la vez
*/
