"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const Validators = __importStar(require("express-validator"));
const ValidatorMiddlewares_1 = require("../middlewares/ValidatorMiddlewares");
/*
    Users Routes
    host + /taller/auth
*/
const router = (0, express_1.Router)();
router.post("/register", [
    // middlewares
    Validators.check("name", "El nombre es obligatorio").not().isEmpty(),
    Validators.check("email", "El email es obligatorio").isEmail(),
    Validators.check("password", "El password debe tener 6 caracteres como mínimo").isLength({ min: 6 }),
    ValidatorMiddlewares_1.ValidatorMiddlewares.fieldValidator,
    ValidatorMiddlewares_1.ValidatorMiddlewares.adminJwtValidator
], AuthController_1.AuthController.createUser);
router.post("/", [
    Validators.check("email", "El email es obligatorio").isEmail(),
    Validators.check("password", "El password debe tener 6 caracteres como mínimo").isLength({ min: 6 }),
    ValidatorMiddlewares_1.ValidatorMiddlewares.fieldValidator,
], AuthController_1.AuthController.loginUser);
router.get("/renew", ValidatorMiddlewares_1.ValidatorMiddlewares.jwtValidator, AuthController_1.AuthController.renewToken);
module.exports = router;
/*
router.post("/register", [] ,AuthController.createUser);
como segundo argumento de mi funcion puedo poner un middleware o varios, como voy a usar mas de uno lo paso en un array

check: sirve para validar un campo en particular, y lo hace de uno a la vez
*/
