import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import 'dotenv/config'

import userRouter from "./routes/users";
import productRouter from "./routes/products";
import orderRouter from "./routes/orders"

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/auth", userRouter);
app.use("/api/products", productRouter)
app.use("/api/orders", orderRouter)

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
