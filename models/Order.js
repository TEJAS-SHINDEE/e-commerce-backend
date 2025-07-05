import mongoose from "mongoose"

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
})

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: [orderItemSchema],
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["placed", "processing", "shipped", "delivered", "cancelled"],
      default: "placed",
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model("Order", orderSchema)
