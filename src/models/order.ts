import mongoose from "mongoose";
import IsEmail from "isemail";

const productOrderSchema = new mongoose.Schema({
  productId: {
    type: String,
  },
  quantity: {
    type: Number,
    min: [1, "Quantity must be at least 1"],
  },
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true,
  },
  customerInfo: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => {
        return IsEmail.validate(v);
      },
      message: (props: any) => `${props.value} is not a valid email address`,
    },
  },
  products: {
    type: [productOrderSchema],
    required: true,
    default: undefined,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.pre("save", async function () {
  const products = this.products;

  if (!Array.isArray(products) || products.length === 0) {
    throw new Error("Order must have at least one product");
  }
});

const Order = mongoose.model("order", orderSchema);
export default Order;
