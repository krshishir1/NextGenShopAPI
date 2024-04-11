import mongoose from "mongoose";

export const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        name: String
    }
})

const Category = mongoose.model("category", categorySchema);
export default Category;