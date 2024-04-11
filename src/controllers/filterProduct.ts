import express, { Request, Response } from "express";

import Joi from "joi";

import Product from "../models/product";

/* 
    This controller is responsible for filtering products by price.
    It accepts minPrice and maxPrice as query parameters and returns products within the specified price range.
*/
const filterProductsByPrice = async function (req: Request, res: Response) {
  try {
    const { minPrice, maxPrice } = req.query;

    let query = {} as any;

    if (minPrice) {
      query = { price: { $gte: minPrice } };
    }

    if (maxPrice) {
      query = query.price
        ? { price: { ...query.price, $lte: maxPrice } }
        : { price: { $lte: maxPrice } };
    }

    if (Object.keys(query).length === 0)
      throw new Error("At least one of minPrice or maxPrice is required");

    const products = await Product.find(query).sort({ price: 1 }).exec();

    res.status(200).json({ products, minPrice, maxPrice });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/* 
    This controller is responsible for filtering products by category.
    It accepts a category as a query parameter and returns products belonging to that category.
*/
const filterProductsByCategory = async function (req: Request, res: Response) {
  try {
    let { category } = req.query;

    const schema = Joi.object({
      category: Joi.string().required(),
    });

    const { error } = schema.validate(req.query);

    const isValid = error === undefined || null;
    if (!isValid) throw new Error(error.message);

    category = category as string;

    const products = await Product.find({ category }).exec();

    res.status(200).json({ products, category });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  FILTER_BY_PRICE: filterProductsByPrice,
  FILTER_BY_CATEGORY: filterProductsByCategory,
};
