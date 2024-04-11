import express, {Request, Response} from "express"

import newOrder from "../controllers/newOrder";
import completeOrder from "../controllers/completeOrder";
import updateOrder from "../controllers/updateOrder";
import manageOrder from "../controllers/manageOrder";

import checkCustomer from "../middlewares/checkCustomer";


const router = express.Router();

/*
    POST /api/orders/new
    Content-Type: application/json
    Authorization: <customer-email>
    {
        customerInfo: <customer-email>,
        products: [
            {
                productId: "<product-id>",
                quantity: 2
            }
        ]
    }
    Usage: Create a new order by adding products assigned by the customer
*/
router.post("/new", checkCustomer, newOrder)

/*
    PATCH /api/orders/:orderId/complete
    Authorization <customer-email>
    Usage: Changes the status of an order to "completed"
*/
router.patch("/:orderId/complete", checkCustomer, completeOrder)

/* 
    PATCH /api/orders/:orderId/cancel
    Authorization <customer-email>
    Usage: Changes the status of an order to "cancelled"
*/
router.patch("/:orderId/cancel", checkCustomer, manageOrder.CANCEL)

/*
    PATCH /api/orders/:orderId/product/add
    Content-Type: application/json
    Authorization : <customer-email>
    {
        productId: "<product-id>",
        quantity: 1
    }
    Usage: Add a product to an existing order
*/
router.patch("/:orderId/product/add", checkCustomer, updateOrder.ADD_PRODUCT)

/*
    PATCH /api/orders/:orderId/product/add
    Content-Type: application/json
    Authorization : <customer-email>
    {
        productId: "<product-id>",
        quantity: 1
    }
    Usage: Delete a product from an existing order
*/
router.patch("/:orderId/product/delete", checkCustomer, updateOrder.DELETE_PRODUCT)

/*
    DELETE /api/orders/:orderId
    Authorization: <customer-email>
    Usage: Delete an order by its id
*/
router.delete("/:orderId", checkCustomer, manageOrder.DELETE)

/*
    GET /api/orders/:orderId
    Authorization <customer-email>
    Usage: Get an order by its id
*/
router.get("/:orderId", checkCustomer, manageOrder.GET)

/* 
    GET /api/orders
    Authorization <customer-email>
    Usage: Get all orders of a customer
*/
router.get("/", checkCustomer, manageOrder.GET_ALL)





export default router;