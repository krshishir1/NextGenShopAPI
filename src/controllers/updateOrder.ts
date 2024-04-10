import express, { Request, Response } from "express";

import Joi from "joi";

import Order from "../models/order";
import Product from "../models/product";

// /api/orders/:orderId/product
const deleteProductFromOrder = async function (req: Request, res: Response) {
  try {
    const orderId = req.params.orderId;

    const productOrderSchema = Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().min(1).required(),
    });

    const { error } = productOrderSchema.validate(req.body);

    const isValid = error === undefined || null;
    if (!isValid) throw new Error(error.message);

    const { productId, quantity } = req.body;

    await Order.updateOne({ orderId }, { $pull: { products: { productId } } });

  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const addProductInOrder = async function (req: Request, res: Response) {
    try {
      const orderId = req.params.orderId;
  
      const productOrderSchema = Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().min(1).required(),
      });
  
      const { error } = productOrderSchema.validate(req.body);
  
      const isValid = error === undefined || null;
      if (!isValid) throw new Error(error.message);
  
      const { productId, quantity } = req.body;
  
      await Order.updateOne({ orderId }, { $push: { products: { productId } } });

  
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

// Creation of new order that includes a list of products
export default {
    DELETE_PRODUCT: deleteProductFromOrder,
    ADD_PRODUCT: addProductInOrder
}