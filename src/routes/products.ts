import express, {Request, Response} from "express"

import createProduct from "../controllers/createProduct"
import updateProduct from "../controllers/updateProduct"
import manageProduct from "../controllers/manageProduct";
import filterProduct from "../controllers/filterProduct";

import checkSeller from "../middlewares/checkSeller";


const router = express.Router();

/*
    POST /api/products/new
    Authorization <sellerId>
    Content-Type: application/json
    {
        "name": "iPhone 12",
        "price": 799,
        "category": "Electronics",
        "description": "A new iPhone 12",
        "inventoryCount": 100
        "sellerId": "<sellerId>"
    }
    Usage: Create a new product
*/
router.post("/new", checkSeller, createProduct)

/*
    PUT /api/products/:productId
    Authorization <sellerId>
    Content-Type: application/json
    {
        "name": "iPhone 12",
        "price": 599,
        "category": "Electronics",
        "description": "A new iPhone 12",
        "inventoryCount": 95
    }
*/
router.put("/:productId", checkSeller, updateProduct)

/*
    DELETE /api/products/:productId
    Authorization <sellerId>
    Usage: Delete a product by its id
*/
router.delete("/:productId", checkSeller, manageProduct.DELETE)

/*
    GET /api/products/:productId
    Authorization <sellerId>
    Usage: Get a product by its id
*/
router.get("/:productId", checkSeller, manageProduct.GET)

/*
    GET /api/products
    Authorization <sellerId>
    Usage: Get all products of a seller
*/
router.get("/", checkSeller, manageProduct.GET_ALL)

/*
    GET /api/products/filter/price?maxPrice=1000&minPrice=500
    Usage: Filter products by price
*/
router.get("/filter/price", filterProduct.FILTER_BY_PRICE)

/*
    GET /api/products/filter/category?category=Electronics
    Usage: Filter products by category
*/
router.get("/filter/category", filterProduct.FILTER_BY_CATEGORY)

export default router;