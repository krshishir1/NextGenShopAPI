import express, {Request, Response} from "express"

import registerSeller from "../controllers/registerSeller";

const router = express.Router();

// Registering a new user
router.post("/register", registerSeller)

export default router;