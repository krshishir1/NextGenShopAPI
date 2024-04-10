import express, { Request, Response } from "express";

import Joi from "joi";
import { v4 as uuidv4 } from "uuid";

import Order from "../models/order";
import Product from "../models/product";
import Customer from "../models/customer";

// Creation of new order that includes a list of products
export default async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;

    const order: any = await Order.findOne({ orderId }).exec();

    for (let i = 0; i < order.products.length; i++) {
      const { productId, quantity } = order.products[i];

      await Product.updateOne(
        { productId },
        { $inc: { inventoryCount: -quantity } }
      );
    }

    await Order.updateOne({ orderId }, { $set: { status: "completed" } });

    res.status(200).json({
      message: "Order completed successfully",
      order,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
