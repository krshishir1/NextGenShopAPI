import express, { Request, Response } from "express";

import Joi from "joi";
import Seller from "../models/seller";

import { v4 as uuidv4 } from "uuid";

/* 
  This controller is responsible for registering a new seller.
  It accepts the seller's name, email and password and creates a new seller in the sellers collection.
*/
const registerSeller = async (req: Request, res: Response) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    const { error } = schema.validate(req.body);

    const isValid = error === undefined || null;
    if (!isValid) throw new Error(error.message);

    let { name, email, password } = req.body;

    const seller = new Seller({ name, email, password, sellerId: uuidv4() });
    await seller.save();

    res.status(201).json({ message: "Seller registered successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default registerSeller;
