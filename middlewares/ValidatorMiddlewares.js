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
exports.ValidatorMiddlewares = void 0;
const Validators = __importStar(require("express-validator"));
const JWT = __importStar(require("jsonwebtoken"));
class ValidatorMiddlewares {
}
exports.ValidatorMiddlewares = ValidatorMiddlewares;
ValidatorMiddlewares.fieldValidator = (req, res, next) => {
    const errors = Validators.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });
    }
    next();
};
ValidatorMiddlewares.jwtValidator = (req, res, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).send({
            ok: false,
        });
    }
    try {
        const payload = JWT.verify(token, process.env.JWT_KEY);
        req.body.id = payload.id;
        req.body.name = payload.name;
    }
    catch (error) {
        return res.status(401).send({
            ok: false,
        });
    }
    next();
};
