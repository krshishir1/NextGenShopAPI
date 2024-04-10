import express, {Request, Response} from "express"

import createProduct from "../controllers/createProduct"

const router = express.Router();

// Creation of a new product
router.post("/new", createProduct)

export default router;