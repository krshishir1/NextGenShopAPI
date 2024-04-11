import express, { Request, Response } from "express";

import Joi from "joi";
import Customer from "../models/customer"

import { comparePassword } from "../utils/passwordManagement";

/* 
  This controller is responsible for logging in a customer.
  It accepts the customer's email and password and returns the customer details if the login is successful.
*/
const loginCustomer = async (req: Request, res: Response) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    const { error } = schema.validate(req.body);

    const isValid = error === undefined || null;
    if (!isValid) throw new Error(error.message);

    const {email, password} = req.body;
    
    const customer = await Customer.findOne({email}).exec()

    if(!customer) throw new Error("Customer not found")

    const isPasswordValid = await comparePassword(password, customer.password)
    if(!isPasswordValid) throw new Error("Invalid password")

    res.status(200).json({ message: "Login successfull", customer });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default loginCustomer;
