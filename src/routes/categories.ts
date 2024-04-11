import express, {Request, Response} from "express"
import manageCategory from "../controllers/manageCategory";

const router = express.Router();


/*
    POST /api/categories/new
    Content-Type: application/json
    {
        "name": "Electronics",
        "description": "All electronic items"
    }
    Usage: Create a new category and stores it in catogories collection
*/
router.post("/new", manageCategory.CREATE)

/*
    PUT /api/categories/:categoryId
    Content-Type: application/json
    {
        "name": "Electronics",
        "description": "All mobile accessories"
    }
    Usage: Update a category by its id
*/
router.put("/:categoryId", manageCategory.UPDATE)


/*
    DELETE /api/categories/:categoryName
    Usage: Delete a category by its name
*/
router.delete("/:categoryName", manageCategory.DELETE)

/*
    GET /api/categories/:categoryId
    Usage: Get a category by its id
*/
router.get("/:categoryId", manageCategory.GET_BY_ID)

/*
    GET /api/categories
    Usage: Get all categories
*/
router.get("/", manageCategory.GET_ALL)

export default router;