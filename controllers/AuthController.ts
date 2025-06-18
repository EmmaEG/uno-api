import { Request, Response } from "express";
import { User } from "../models/UserClass";
import * as Bcryptjs from "bcryptjs";
import { makeToken } from "../utils/jwt";

// const roles = [
//   role: 'admin',
//   role: 'employee'
// ]

export class AuthController {
  static createUser = async (req: Request, res: Response) => {
    try {
      let user = await User.findOne({ email: req.body.email }); // if user doesn't exists on db retunr null

      if (user) {
        return res.status(400).json({
          msg: "El usuario ya existe con ese correo",
        });
      }

      user = new User(req.body);

      const salt = Bcryptjs.genSaltSync();
      user.setPassword(Bcryptjs.hashSync(req.body.password, salt));

      await user.save();

      res.status(201).json({
        ok: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Hable con el administrador",
      });
    }
  };

  static loginUser = async (req: Request, res: Response) => {
    try {
      const email = req.body.email;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          msg: "Verifique el credenciales",
        });
      }

      const validPassword = Bcryptjs.compareSync(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res.status(400).json({
          msg: "Verifique sus credenciales",
        });
      }

      const token = await makeToken(user.id, user.name, user.role);

      res.status(200).json({
        id: user.id,
        name: user.name,
        role: user.role,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Hable con el Adminstrador",
      });
    }
  };

  static renewToken = async (req: Request, res: Response) => {
    try {
      const { id } = req.body;
      const user = await User.findById(id);

      if (!user) {
        return res.status(400).json({
          msg: "Hable con el Adminstrador",
        });
      }

      const token = await makeToken(user.id, user.name, user.role);

      res.status(200).json({
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Hable con el Adminstrador",
      });
    }
  };
}
