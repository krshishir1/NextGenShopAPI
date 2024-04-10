import express, {Request, Response} from "express"

import createProduct from "../controllers/createProduct"
import updateProduct from "../controllers/updateProduct"
import manageProduct from "../controllers/manageProduct";

import checkSeller, {checkSellerHeader} from "../middlewares/checkSeller";


const router = express.Router();

// Creation of a new product
router.post("/new", checkSeller, createProduct)
router.put("/:productId", checkSeller, updateProduct)

router.delete("/:productId", checkSellerHeader, manageProduct.DELETE)
router.get("/:productId", checkSellerHeader, manageProduct.GET)
router.get("/", checkSellerHeader, manageProduct.GET_ALL)

export default router;