import express, {Request, Response} from "express"
import manageCategory from "../controllers/manageCategory";

const router = express.Router();


// /api/categories/

router.post("/new", manageCategory.CREATE)
router.put("/:categoryId", manageCategory.UPDATE)
router.delete("/:categoryName", manageCategory.DELETE)
router.get("/:categoryId", manageCategory.GET_BY_ID)
router.get("/", manageCategory.GET_ALL)

export default router;