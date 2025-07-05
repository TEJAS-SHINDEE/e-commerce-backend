import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/database.js"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import { errorHandler } from "./middleware/errorHandler.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/payment", paymentRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ message: "E-commerce API is running!" })
})

// Error handling middleware
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
