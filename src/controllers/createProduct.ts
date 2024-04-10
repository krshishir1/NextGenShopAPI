import express, { Request, Response } from "express";

import Joi from "joi";
import { v4 as uuidv4 } from 'uuid';

import Product from "../models/product"


// Creation of a new product
export default async (req: Request, res: Response) => {
    try {

        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string(),
            price: Joi.number().required(),
            category: Joi.string().required(),
            inventoryCount: Joi.number().required(),
        })

        const { error } = schema.validate(req.body);

        const isValid = error === undefined || null;
        if (!isValid) throw new Error(error.message);

        const newProductId = uuidv4()


        const newProduct = new Product({...req.body, productId: newProductId})

        await newProduct.save()

        res.status(201).json({ message: "Product created successfully" });

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

