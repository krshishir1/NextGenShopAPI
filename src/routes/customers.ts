import express, { Request, Response } from "express";

import registerCustomer from "../controllers/registerCustomer";
import loginCustomer from "../controllers/loginCustomer";
import manageCustomer from "../controllers/manageCustomer";

import checkCustomer from "../middlewares/checkCustomer";

const router = express.Router();

// /auth/customers

// Registering a new user
router.post("/register", registerCustomer);
router.post("/login", loginCustomer);

router.delete("/delete-account", checkCustomer, manageCustomer.DELETE_ACCOUNT);

router.get("/get-account", checkCustomer, manageCustomer.GET_INFO);

router.put("/update", checkCustomer, manageCustomer.UPDATE_INFO);

router.patch("/change-password", checkCustomer, manageCustomer.CHANGE_PASSWORD);

router.get("/get-customers", manageCustomer.GET_CUSTOMERS);

export default router;
