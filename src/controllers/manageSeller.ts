import express, { Request, Response } from "express";

import Joi from "joi";

import Seller from "../models/seller";
import { hashPassword } from "../utils/passwordManagement";

// Creation of a new product
const updateSellerInfo = async function (req: Request, res: Response) {
  try {
    const sellerId = req.headers.authorization;

    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    });

    const { error } = schema.validate(req.body);

    const isValid = error === undefined || null;
    if (!isValid) throw new Error(error.message);

    const { name, email } = req.body;

    await Seller.updateOne(
      { sellerId },
      { $set: { name, email } }
    );

    res.status(201).json({ message: "Seller updated successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const changePassword = async function (req: Request, res: Response) {
  try {
    const sellerId = req.headers.authorization;

    const schema = Joi.object({
      password: Joi.string().min(8).required(),
    });

    const { error } = schema.validate(req.body);

    const isValid = error === undefined || null;
    if (!isValid) throw new Error(error.message);

    const { password } = req.body;

    await Seller.updateOne(
      { sellerId },
      { $set: { password: hashPassword(password) } }
    );

    res.status(201).json({ message: "Password Changed successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get customer info
const getSellerInfo = async function (req: Request, res: Response) {
  try {
    const sellerId = req.headers.authorization;

    const seller = await Seller.findOne({ sellerId }).exec();

    res.status(200).json({ seller });
  } catch (err : any) {
    res.status(500).json({ error: err.message });
  }
};

const getSellers = async function (req: Request, res: Response) {
  try {
    const sellers = await Seller.find().exec();

    res.status(200).json({ sellers });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const deleteAccount = async function (req: Request, res: Response) {
  try {
    const sellerId = req.headers.authorization;

    await Seller.findOneAndDelete({ sellerId }).exec();

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  UPDATE_INFO: updateSellerInfo,
  CHANGE_PASSWORD: changePassword,
  GET_INFO: getSellerInfo,
  GET_CUSTOMERS: getSellers,
  DELETE_ACCOUNT: deleteAccount
};
