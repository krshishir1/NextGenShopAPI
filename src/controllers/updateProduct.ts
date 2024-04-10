import express, { Request, Response } from "express";

import Joi from "joi";

import Product from "../models/product";

// Creation of a new product
export default async (req: Request, res: Response) => {
  try {

    const productId = req.params.productId;

    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string(),
      price: Joi.number().required(),
      category: Joi.string().required(),
      inventoryCount: Joi.number().required(),
      sellerId: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    const isValid = error === undefined || null;
    if (!isValid) throw new Error(error.message);

    const {name, description, price, category, inventoryCount} = req.body;

    await Product.updateOne({ productId }, { $set: {name, description, price, category, inventoryCount} })

    res.status(201).json({ message: "Product updated successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
