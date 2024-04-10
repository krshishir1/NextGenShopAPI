import express, {Request, Response} from "express"

import createProduct from "../controllers/createProduct"
import updateProduct from "../controllers/updateProduct"
import manageProduct from "../controllers/manageProduct";

import checkSeller from "../middlewares/checkSeller";


const router = express.Router();

// Creation of a new product
router.post("/new", checkSeller, createProduct)
router.put("/:productId", checkSeller, updateProduct)

router.delete("/:productId", checkSeller, manageProduct.DELETE)
router.get("/:productId", checkSeller, manageProduct.GET)
router.get("/", checkSeller, manageProduct.GET_ALL)

export default router;