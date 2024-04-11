import express, { Request, Response } from "express";

import Order from "../models/order";

/* 
  This controller is responsible for cancelling an order.
  It updates the order status to "cancelled".
*/
const cancelOrder = async function (req: Request, res: Response) {
  try {
    const orderId = req.params.orderId;

    await Order.updateOne({ orderId }, { $set: { status: "cancelled" } });

    res.status(200).json({
      message: "Order cancelled successfully",
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/* 
  This controller is responsible for deleting an order.
  It accepts the order ID and deletes the order from the orders collection.
*/
const deleteOrder = async function (req: Request, res: Response) {
  try {
    const orderId = req.params.orderId;
    await Order.findOneAndDelete({ orderId }).exec();

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/* 
  This controller is responsible for getting an order.
  It accepts the order ID and returns the order.
*/
const getOrder = async function (req: Request, res: Response) {
    try {
      const orderId = req.params.orderId;
      const order = await Order.findOne({ orderId })
  
      res.status(200).json({ order });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

/*
  This controller is responsible for getting all orders.
*/
const getAllOrders = async function (req: Request, res: Response) {
  try {
    const customerInfo = req.headers.authorization;
    const orders = await Order.find({email: customerInfo}).exec();

    res.status(200).json({ orders });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export default {
    GET: getOrder,
    GET_ALL: getAllOrders,
    DELETE: deleteOrder,
    CANCEL: cancelOrder
}