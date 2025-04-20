import { Schema, model } from "mongoose";
import { UserRole } from "./Roles.enum";

export interface IUserClass {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly role: string;
  setPassword: (password: string) => void;
}

class UserClass {
  name: string;
  email: string;
  password: string;
  role: string;

  constructor(args: IUserClass) {
    this.name = args.name;
    this.email = args.email;
    this.password = args.password;
    this.role = args.role;
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
    role: { 
      type: String, 
      enum: Object.values(UserRole),
      default: UserRole.EMPLOYEE,
      required: true 
    },
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
