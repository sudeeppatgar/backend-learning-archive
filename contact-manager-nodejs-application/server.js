import express from "express";
import dotenv from "dotenv";
import Routes from "./routes/index.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { connectDB } from "./config/db.js";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

connectDB(process.env.MONGODB_URI);
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
app.use(express.json());
app.use("/api/", Routes);
app.use(errorMiddleware);
