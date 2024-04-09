import express, {Request, Response} from "express"

import registerUser from "../controllers/registerUser";

const router = express.Router();

// Registering a new user
router.post("/users", registerUser)

export default router;