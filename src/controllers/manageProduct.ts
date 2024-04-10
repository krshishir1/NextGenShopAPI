import express, { Request, Response } from "express";

import Joi from "joi";

import Product from "../models/product";

const getProductById = async function (req: Request, res: Response) {
  try {
    const productId = req.params.productId;

    const product = await Product.findOne({ productId }).exec();

    res.status(200).json({ product });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const getAllProducts = async function (req: Request, res: Response) {
  try {
    const sellerId = req.headers.authorization;
    const products = await Product.find({ sellerId }).exec();

    res.status(200).json({ products });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProduct = async function (req: Request, res: Response) {
  try {
    const productId = req.params.productId;

    await Product.findOneAndDelete({ productId }).exec();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  GET: getProductById,
  GET_ALL: getAllProducts,
  DELETE: deleteProduct,
};
