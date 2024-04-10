import express, { Request, Response } from "express";

import Joi, { custom } from "joi";
import { v4 as uuidv4 } from "uuid";

import Order from "../models/order";
import Product from "../models/product";
import Customer from "../models/customer";

// Creation of new order that includes a list of products
export default async (req: Request, res: Response) => {
  try {
    const productOrderSchema = Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().min(1).required(),
    });

    const schema = Joi.object({
      products: Joi.array().items(productOrderSchema).min(1),
      customerInfo: Joi.string().email().required(),
      status: Joi.string()
        .valid("pending", "completed", "cancelled")
        .required(),
    });

    const { error } = schema.validate(req.body);

    const isValid = error === undefined || null;
    if (!isValid) throw new Error(error.message);

    const { products, customerInfo, status } = req.body;
    let totalPrice = 0;

    for (let i = 0; i < products.length; i++) {
      const { productId, quantity } = products[i];

      const product: any = await Product.findOne({ productId }).exec();
      totalPrice += product.price * quantity;

      Product.updateOne(
        { productId },
        { $inc: { inventoryCount: -quantity } }
      ).exec();
    }

    const newOrderId = uuidv4();

    await Customer.updateOne(
      { email: customerInfo },
      { $push: { orders: { orderId: newOrderId } } }
    ).exec();

    const newOrder = new Order({
      orderId: newOrderId,
      products,
      customerInfo,
      status,
    });

    await newOrder.save();

    res
      .status(201)
      .json({
        message: "Order created successfully",
        order: newOrder,
        totalPrice,
      });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
