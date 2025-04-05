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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const UserClass_1 = require("../models/UserClass");
const Bcryptjs = __importStar(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
class AuthController {
}
exports.AuthController = AuthController;
_a = AuthController;
AuthController.createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield UserClass_1.User.findOne({ email: req.body.email }); // if usewr doesn't exists on db retunr null
        if (user) {
            return res.status(400).json({
                msg: "El usuario ya existe con ese correo",
            });
        }
        // user = new User(req.body);
        const salt = Bcryptjs.genSaltSync();
        // user.setPassword(Bcryptjs.hashSync(req.body.password, salt));
        const hashedPassword = Bcryptjs.hashSync(req.body.password, salt);
        user = new UserClass_1.User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        yield user.save();
        res.status(201).json({
            ok: true
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador",
        });
    }
});
AuthController.loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const user = yield UserClass_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: "Verifique el credenciales",
            });
        }
        const validPassword = Bcryptjs.compareSync(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Verifique sus credenciales",
            });
        }
        const token = yield (0, jwt_1.makeToken)(user.id, user.name);
        res.status(200).json({
            id: user.id,
            name: user.name,
            token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el Adminstrador",
        });
    }
});
AuthController.renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield (0, jwt_1.makeToken)(req.body.id, req.body.name);
        res.status(200).json({
            token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el Adminstrador",
        });
    }
});
