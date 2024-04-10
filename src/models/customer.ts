import mongoose from "mongoose";
import IsEmail from "isemail";

import { hashPassword } from "../utils/passwordManagement";

const customerOrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
  },
});

customerOrderSchema.set("autoIndex", false);

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => {
        return IsEmail.validate(v);
      },
      message: (props: any) => `${props.value} is not a valid email address`,
    },
  },
  password: {
    type: String,
    required: true,
    min: [8, "Password must be at least 8 characters long"],
  },
  orders: {
    type: [customerOrderSchema],
    default: undefined  },
});

customerSchema.pre("save", async function () {
  const hashedPassword = await hashPassword(this.password);
  if (hashedPassword) {
    this.password = hashedPassword;
  }
});

const Customer = mongoose.model("customer", customerSchema);

export default Customer;
