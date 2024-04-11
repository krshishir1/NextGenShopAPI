import express, { Request, Response } from "express";

import registerSeller from "../controllers/registerSeller";
import loginSeller from "../controllers/loginSeller";
import manageSeller from "../controllers/manageSeller";
import checkSeller from "../middlewares/checkSeller";

const router = express.Router();

/*
    POST /api/sellers/register
    Content-Type: application/json
    {
        "name": "Raymonds",
        "email": "info@raymonds.com",
        "password": "<password>"
    }
    Usage: Signs up a new seller
*/
router.post("/register", registerSeller);

/*
    POST /api/sellers/login
    Content-Type: application/json
    {
        "email": "info@raymonds.com",
        "password": "<password>"
    }
    Usage: Login a seller
*/
router.post("/login", loginSeller);

/*
    DELETE /api/sellers/delete-account
    Authorization <sellerId>
    Usage: Delete a seller account
*/
router.delete("/delete-account", checkSeller, manageSeller.DELETE_ACCOUNT);

/*
    GET /api/sellers/get-account
    Authorization <sellerId>
    Usage: Get seller account info
*/
router.get("/get-account", checkSeller, manageSeller.GET_INFO);

/*
    PUT /api/sellers/update
    Authorization <sellerId>
    Content-Type: application/json
    {
        name: "Raymonds",
        email: "about@raymonds.com"
    },
    Usage: Update seller info
*/
router.put("/update", checkSeller, manageSeller.UPDATE_INFO);

/*
    PATCH /api/sellers/change-password
    Authorization <sellerId>
    Content-Type: application/json
    {
        password: "<new-password>"
    },
    Usage: Change seller password
*/
router.patch("/change-password", checkSeller, manageSeller.CHANGE_PASSWORD);

/*
    GET /api/sellers/get-sellers
    Usage: Get all sellers
*/
router.get("/get-sellers", manageSeller.GET_SELLERS);

export default router;
