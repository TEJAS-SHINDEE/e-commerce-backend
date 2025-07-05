import express from "express"
import { addToCart, getCart, updateCartItem, removeFromCart } from "../controllers/cartController.js"

const router = express.Router()

// POST /api/cart - Add item to cart
router.post("/", addToCart)

// GET /api/cart/:userId - Get cart items for a user
router.get("/:userId", getCart)

// PUT /api/cart/:userId - Update quantity of an item
router.put("/:userId", updateCartItem)

// DELETE /api/cart/:userId/:productId - Remove item from cart
router.delete("/:userId/:productId", removeFromCart)

export default router
