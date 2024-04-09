import express, { Request, Response } from "express";

import Joi from "joi";
import Customer from "../models/customer"

const registerCustomer = async (req: Request, res: Response) => {
  try {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    const { error } = schema.validate(req.body);

    const isValid = error === undefined || null;
    if (!isValid) throw new Error(error.message);

    const customer = new Customer(req.body)
    await customer.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default registerCustomer;
