import mongoose from "mongoose";
import IsEmail from "isemail";

import { hashPassword } from "../utils/passwordManagement";

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        unique: true
    }
})

export const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    sellerId: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: (v: string) => {
                return IsEmail.validate(v);
            },
            message: (props: any) => `${props.value} is not a valid email address`
        }
    },
    password: {
        type: String,
        required: true,
        min: [8, "Password must be at least 8 characters long"]
    },
    products: {
        type: [productSchema],
        default: []
    }
})

sellerSchema.pre("save", async function () {
    const hashedPassword = await hashPassword(this.password);
    if(hashedPassword) {
        this.password = hashedPassword;
    }
})

const Seller = mongoose.model("seller", sellerSchema);
export default Seller;