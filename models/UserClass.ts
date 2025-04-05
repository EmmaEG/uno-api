import { Schema, model } from "mongoose";

export interface IUserClass {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  setPassword: (password: string) => void;
}

class UserClass {
  name: string;
  email: string;
  password: string;

  constructor(args: IUserClass) {
    this.name = args.name;
    this.email = args.email;
    this.password = args.password;
  }

  public setPassword(password: string): void {
    this.password = password;
  }
}

const userSchema = new Schema<IUserClass>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { versionKey: false, toJSON: { virtuals: true }, id: true }
);

userSchema.set("toJSON", {
  virtuals: true,
  transform: function (_doc, ret) {
    delete ret._id; // Delete _id in the answer
  },
});

userSchema.loadClass(UserClass);

export const User = model<IUserClass>("User", userSchema);
