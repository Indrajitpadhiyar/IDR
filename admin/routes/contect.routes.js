import express from "express";
import { sendeContactEmail } from "../controllers/contect.controller.js";

const router = express.Router();

router.post("/", sendeContactEmail);

export default router;
