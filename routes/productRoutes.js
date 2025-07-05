import express from "express"
import {
  getProducts,
  getProductsByCategory,
  getSortedProductsByCategory,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js"

const router = express.Router()

// GET /api/products - get all products with optional search
router.get("/", getProducts)

// GET /api/products/category/:categoryName - get products by category
router.get("/category/:categoryName", getProductsByCategory)

// GET /api/products/sort/:categoryName - get products by category (sorted)
router.get("/sort/:categoryName", getSortedProductsByCategory)

// POST /api/products - add new product
router.post("/", addProduct)

// PUT /api/products/:id - update product
router.put("/:id", updateProduct)

// DELETE /api/products/:id - delete product
router.delete("/:id", deleteProduct)

export default router
