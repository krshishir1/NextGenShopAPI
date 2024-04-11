import express, { Request, Response } from "express";

import Joi from "joi";

import Customer from "../models/customer";
import { hashPassword } from "../utils/passwordManagement";


/* 
  This controller is responsible for updating a customer's information.
  It accepts the customer's first name and last name and updates the customer's information in the customers collection.
*/
const updateCustomerInfo = async function (req: Request, res: Response) {
  try {
    const customerEmail = req.headers.authorization;

    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    const isValid = error === undefined || null;
    if (!isValid) throw new Error(error.message);

    const { firstName, lastName } = req.body;

    await Customer.updateOne(
      { email: customerEmail },
      { $set: { firstName, lastName } }
    );

    res.status(201).json({ message: "Product updated successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/*
  This controller is responsible for changing a customer's password.
  It accepts the customer's new password and updates the customer's password in the customers collection.
*/
const changePassword = async function (req: Request, res: Response) {
  try {
    const customerEmail = req.headers.authorization;

    const schema = Joi.object({
      password: Joi.string().min(8).required(),
    });

    const { error } = schema.validate(req.body);

    const isValid = error === undefined || null;
    if (!isValid) throw new Error(error.message);

    const { password } = req.body;

    await Customer.updateOne(
      { email: customerEmail },
      { $set: { password: hashPassword(password) } }
    );

    res.status(201).json({ message: "Password Changed successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};



/* 
  This controller is responsible for getting a customer's information.
  It accepts the customer's email and returns the customer's information.
*/
const getCustomerInfo = async function (req: Request, res: Response) {
  try {
    const customerEmail = req.headers.authorization;

    const customer = await Customer.findOne({ email: customerEmail }).exec();

    res.status(200).json({ customer });
  } catch (err : any) {
    res.status(500).json({ error: err.message });
  }
};

/* 
  This controller is responsible for getting all customers.
*/
const getCustomers = async function (req: Request, res: Response) {
  try {
    const customers = await Customer.find().exec();

    res.status(200).json({ customers });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/* 
  This controller is responsible for deleting a customer's account.
  It accepts the customer's email and deletes the customer's account from the customers collection.
*/
const deleteAccount = async function (req: Request, res: Response) {
  try {
    const customerEmail = req.headers.authorization;

    await Customer.findOneAndDelete({ email: customerEmail }).exec();

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  UPDATE_INFO: updateCustomerInfo,
  CHANGE_PASSWORD: changePassword,
  GET_INFO: getCustomerInfo,
  GET_CUSTOMERS: getCustomers,
  DELETE_ACCOUNT: deleteAccount
};
