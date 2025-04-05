import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import * as Validators from "express-validator";
import { ValidatorMiddlewares } from "../middlewares/ValidatorMiddlewares";

/*
    Users Routes
    host + /book-list/auth
*/
const router = Router();

router.post(
  "/register",
  [
    // middlewares
    Validators.check("name", "El nombre es obligatorio").not().isEmpty(),
    Validators.check("email", "El email es obligatorio").isEmail(),
    Validators.check(
      "password",
      "El password debe tener 6 caracteres como mínimo"
    ).isLength({ min: 6 }),
    ValidatorMiddlewares.fieldValidator,
  ],
  AuthController.createUser
);

router.post(
  "/",
  [
    Validators.check("email", "El email es obligatorio").isEmail(),
    Validators.check(
      "password",
      "El password debe tener 6 caracteres como mínimo"
    ).isLength({ min: 6 }),
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
