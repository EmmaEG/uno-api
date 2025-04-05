"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
class UserClass {
    constructor(args) {
        this.name = args.name;
        this.email = args.email;
        this.password = args.password;
    }
    setPassword(password) {
        this.password = password;
    }
}
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { versionKey: false, toJSON: { virtuals: true }, id: true });
userSchema.set("toJSON", {
    virtuals: true,
    transform: function (_doc, ret) {
        delete ret._id; // Delete _id in the answer
    },
});
userSchema.loadClass(UserClass);
exports.User = (0, mongoose_1.model)("User", userSchema);
