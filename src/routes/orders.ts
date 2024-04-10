import express, {Request, Response} from "express"

import newOrder from "../controllers/newOrder";
import completeOrder from "../controllers/completeOrder";
import updateOrder from "../controllers/updateOrder";
import manageOrder from "../controllers/manageOrder";

import checkCustomer from "../middlewares/checkCustomer";


const router = express.Router();

// /api/orders

// Creation of a new order
router.post("/new", checkCustomer, newOrder)

router.patch("/:orderId/complete", checkCustomer, completeOrder)

router.patch("/:orderId/cancel", checkCustomer, manageOrder.CANCEL)

router.patch("/:orderId/product/add", checkCustomer, updateOrder.ADD_PRODUCT)

router.patch("/:orderId/product/delete", checkCustomer, updateOrder.DELETE_PRODUCT)

router.delete("/:orderId", checkCustomer, manageOrder.DELETE)

router.get("/:orderId", checkCustomer, manageOrder.GET)

router.get("/", checkCustomer, manageOrder.GET_ALL)





export default router;