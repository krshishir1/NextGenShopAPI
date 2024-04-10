import express, { Request, Response } from "express";

import Joi from "joi";
import Seller from "../models/seller"

import { comparePassword } from "../utils/passwordManagement";

const loginSeller = async (req: Request, res: Response) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    const { error } = schema.validate(req.body);

    const isValid = error === undefined || null;
    if (!isValid) throw new Error(error.message);

    const {email, password} = req.body;
    
    const seller = await Seller.findOne({email}).exec()

    if(!seller) throw new Error("Seller not found")

    const isPasswordValid = await comparePassword(password, seller.password)
    if(!isPasswordValid) throw new Error("Invalid password")

    res.status(200).json({ message: "Login successfull", seller });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default loginSeller;
