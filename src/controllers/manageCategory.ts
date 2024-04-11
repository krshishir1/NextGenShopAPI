import {Request, Response} from 'express';

import Joi from 'joi';
import Category from '../models/category';

/* 
    This controller is responsible for creating a new category.
    It accepts the category name and description and creates a new category in the categories collection.
*/
const createCategory = async function(req: Request, res: Response) {
    try {
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string()
        })

        const {error} = schema.validate(req.body);

        if(error) throw new Error(error.message);

        const {name, description} = req.body;

        const category = new Category({name, description});
        await category.save();

        res.status(201).json({message: "Category created successfully", category})

    } catch(err : any) {
        res.status(500).json({error: err.message})
    }
}

/* 
    This controller is responsible for deleting a category.
    It accepts the category name and deletes the category from the categories collection.
*/
const deleteCategory = async function(req: Request, res: Response) {
    try {

        const categoryName = req.params.categoryName;

        if(!categoryName) throw new Error("Category name is required")

        await Category.findOneAndDelete({name: categoryName}).exec();

        res.status(200).json({message: "Category deleted successfully"})

    } catch(err : any) {
        res.status(500).json({error: err.message})
    }
}

/* 
    This controller is responsible for updating a category.
    It accepts the category ID, name and description and updates the category in the categories collection.
*/
const updateCategory = async function(req: Request, res: Response) {
    try {

        const categoryId = req.params.categoryId;

        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string()
        })
        
        const {error} = schema.validate(req.body);
        if(error) throw new Error(error.message);

        const {name, description} = req.body;

        await Category.findOneAndUpdate({_id: categoryId}, {name, description}).exec();

        res.status(200).json({message: "Category updated successfully"})


    } catch(err : any) {
        res.status(500).json({error: err.message})
    }
}

/* 
    This controller is responsible for getting a category by its ID.
    It accepts the category ID and returns the category details.
*/
const getCategoryById = async function(req: Request, res: Response) {
    try {

        const categoryId = req.params.categoryId;
        if(!categoryId) throw new Error("Category id is required")

        const category = await Category.findOne({_id : categoryId}).exec()

        res.status(200).json({category})

    } catch(err : any) {
        res.status(500).json({error: err.message})
    }
}

/*
    This controller is responsible for getting all categories.
*/
const getAllCategories = async function(req: Request, res: Response) {
    try {

        const categories = await Category.find({}).exec();

        res.status(200).json({categories})

    } catch(err : any) {
        res.status(500).json({error: err.message})
    }
}

export default {
    CREATE: createCategory,
    DELETE: deleteCategory,
    UPDATE: updateCategory,
    GET_BY_ID: getCategoryById,
    GET_ALL: getAllCategories
}