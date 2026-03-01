import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contact.routes.js";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 4000;

// DB connection
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("DB is connected");
}).catch((err) => {
  console.log("DB connection error:", err);
});

app.use(cors());
app.use(express.json());

app.use("/api/contact", contactRoutes);

app.listen(PORT, () => {
  console.log(`server run on port ${PORT}`);
});
