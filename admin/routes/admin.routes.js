import express from "express";

const router = express.Router();

// Placeholder for admin routes
router.get("/status", (req, res) => {
    res.json({ status: "Admin API is active" });
});

export default router;
