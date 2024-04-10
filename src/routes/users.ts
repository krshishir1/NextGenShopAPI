import express, {Request, Response} from "express"

import registerCustomer from "../controllers/registerCustomer";
import loginCustomer from "../controllers/loginCustomer";

const router = express.Router();

// Registering a new user
router.post("/register", registerCustomer)
router.post("/login", loginCustomer)

export default router;