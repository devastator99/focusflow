import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import habitRoutes from "./routes/habits.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/habits", habitRoutes);

mongoose.connect(process.env.MONGO_URI!)
  .then(() => app.listen(5000, () => console.log("Server running on port 5000")))
  .catch(err => console.log(err));
