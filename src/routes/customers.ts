import express, { Request, Response } from "express";

import registerCustomer from "../controllers/registerCustomer";
import loginCustomer from "../controllers/loginCustomer";
import manageCustomer from "../controllers/manageCustomer";

import checkCustomer from "../middlewares/checkCustomer";

const router = express.Router();

/*
    POST /api/customers/register
    Content-Type: application/json
    {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@gmail.com",
        "password": "<password>"
    }
    Usage: Signs up a new customer
*/
router.post("/register", registerCustomer);

/*
    POST /api/customers/login
    Content-Type: application/json
    {
        "email": "john@gmail.com",
        "password": "<password>"
    }
    Usage: Login a customer
*/
router.post("/login", loginCustomer);


/*
    DELETE /api/customers/delete-account
    Authorization <customer-email>
    Usage: Delete a customer account
*/
router.delete("/delete-account", checkCustomer, manageCustomer.DELETE_ACCOUNT);

/*
    GET /api/customers/get-account
    Authorization <customer-email>
    Usage: Get customer account details
*/
router.get("/get-account", checkCustomer, manageCustomer.GET_INFO);

/*
    PUT /api/customers/update
    Authorization <customer-email>
    Content-Type: application/json
    {
        "firstName": "John",
        "lastName": "Donut",
    }
    Usage: Update customer info
*/
router.put("/update", checkCustomer, manageCustomer.UPDATE_INFO);

/*
    PATCH /api/customers/change-password
    Authorization: <customer-email>
    Content-Type: application/json
    {
        "password": "<new-password>"
    }
    Usage: Change customer password
*/
router.patch("/change-password", checkCustomer, manageCustomer.CHANGE_PASSWORD);

/*
    GET /api/customers/get-customers
    Usage: Get all customers
*/
router.get("/get-customers", manageCustomer.GET_CUSTOMERS);

export default router;
