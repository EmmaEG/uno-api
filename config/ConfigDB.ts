import * as Mongoose from "mongoose";

export class ConfigDB {
  static dbConnecttion = async () => {
    try {
      await Mongoose.connect(process.env.DB_CNN!);
      Mongoose.set("strictQuery", true);

      console.log("db online");
    } catch (error) {
      console.log(error);
      throw new Error("Error to up db");
    }
  };
}
