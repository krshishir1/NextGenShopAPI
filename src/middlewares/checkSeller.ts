import express, { NextFunction, Request, Response } from "express";

import Seller from "../models/seller";
import Product from "../models/product";

/* This middleware checks if the seller is authorized to access the resource by checking the seller's ID in the authorization header. */

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authData = req.headers.authorization;
    const productId = req.params.productId;

    if (!authData) throw new Error("Authorization header is required");

    const seller = await Seller.findOne({ sellerId: authData }).exec();
    if (!seller) throw new Error("Seller not found");

    if (productId) {
      const product = await Product.findOne({
        productId,
        sellerId: authData,
      }).exec();

      if (!product) throw new Error("Invalid seller ID");
    }

    next();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
