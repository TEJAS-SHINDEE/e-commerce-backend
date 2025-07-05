import express from "express"
import { processPayment } from "../controllers/paymentController.js"

const router = express.Router()

// POST /api/payment - Process payment
router.post("/", processPayment)

export default router
