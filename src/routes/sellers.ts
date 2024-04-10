import express, { Request, Response } from "express";

import registerSeller from "../controllers/registerSeller";
import loginSeller from "../controllers/loginSeller";
import manageSeller from "../controllers/manageSeller";
import checkSeller from "../middlewares/checkSeller";

const router = express.Router();

// Registering a new user
router.post("/register", registerSeller);

router.post("/login", loginSeller);

router.delete("/delete-account", checkSeller, manageSeller.DELETE_ACCOUNT);

router.get("/get-account", checkSeller, manageSeller.GET_INFO);

router.put("/update", checkSeller, manageSeller.UPDATE_INFO);

router.patch("/change-password", checkSeller, manageSeller.CHANGE_PASSWORD);

router.get("/get-customers", manageSeller.GET_CUSTOMERS);

export default router;
