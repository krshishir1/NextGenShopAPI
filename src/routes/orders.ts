import express, {Request, Response} from "express"

import newOrder from "../controllers/newOrder";

const router = express.Router();

// Creation of a new order
router.post("/new", newOrder)

export default router;