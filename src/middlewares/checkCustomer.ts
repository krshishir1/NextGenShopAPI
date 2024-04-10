import { Request, Response, NextFunction } from "express";
import Customer from '../models/customer';
import Order from "../models/order";


export default async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const customerEmail = req.headers.authorization;
      const orderId = req.params.orderId

      if(!customerEmail) throw new Error("Authorization header is required");
  
      const customer = await Customer.findOne({ email : customerEmail }).exec();

      if (!customer) throw new Error("Customer not found");

      if(orderId) {
        const order = await Order.findOne({ orderId, email: customerEmail }).exec();

        if(!order) throw new Error("Invalid customer email");
      }
  
      next()
  
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };