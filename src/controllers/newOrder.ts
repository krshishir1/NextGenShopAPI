import express, { Request, Response } from "express";

import Joi, { custom } from "joi";
import { v4 as uuidv4 } from "uuid";

import Order from "../models/order";
import Product from "../models/product";
import Customer from "../models/customer";

/* 
  This controller is responsible for creating a new order.
  It accepts the products in the order, the customer's email, and creates a new order in the orders collection.
  Only registered customers can create an order.
*/
export default async (req: Request, res: Response) => {
  try {
    const productOrderSchema = Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().min(1).required(),
    });

    const schema = Joi.object({
      products: Joi.array().items(productOrderSchema),
      customerInfo: Joi.string().email().required(),
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
      status: "pending",
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
