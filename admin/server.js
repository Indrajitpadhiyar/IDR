import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contect.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/contect", contactRoutes);

app.listen(PORT, () => {
  console.log(`server run on port ${PORT}`);
});
