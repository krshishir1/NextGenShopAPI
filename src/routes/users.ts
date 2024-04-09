import express, {Request, Response} from "express"

import registerCustomer from "../controllers/registerCustomer";
import loginCustomer from "../controllers/loginCustomer";

const router = express.Router();

// Registering a new user
router.post("/customers/register", registerCustomer)
router.post("/customers/login", loginCustomer)

export default router;