import express from "express"
import { placeOrder, getUserOrders, getAllOrders, updateOrderStatus } from "../controllers/orderController.js"

const router = express.Router()

// POST /api/orders - Place a new order (from cart)
router.post("/", placeOrder)

// GET /api/orders/:userId - Get all orders of a user
router.get("/:userId", getUserOrders)

// GET /api/orders - Admin: get all orders
router.get("/", getAllOrders)

// PUT /api/orders/:orderId - Update order status
router.put("/:orderId", updateOrderStatus)

export default router
