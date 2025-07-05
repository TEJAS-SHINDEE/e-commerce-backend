import Order from "../models/Order.js"
import Cart from "../models/Cart.js"
import Product from "../models/Product.js"

// Place a new order from cart
export const placeOrder = async (req, res) => {
  try {
    const { userId } = req.body

    if (!userId) {
      return res.status(400).json({ message: "UserId is required" })
    }

    // Get user's cart
    const cart = await Cart.findOne({ userId })
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" })
    }

    // Create order items with current prices
    const orderItems = []
    let total = 0

    for (const cartItem of cart.items) {
      const product = await Product.findOne({ id: cartItem.productId })
      if (product) {
        const orderItem = {
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          price: product.price,
        }
        orderItems.push(orderItem)
        total += product.price * cartItem.quantity
      }
    }

    // Create order
    const order = new Order({
      userId,
      items: orderItems,
      total,
      status: "placed",
    })

    await order.save()

    // Clear cart after successful order
    await Cart.findOneAndUpdate({ userId }, { items: [], total: 0 })

    res.status(201).json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get all orders for a user
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params
    const orders = await Order.find({ userId }).sort({ createdAt: -1 })

    // Populate with product details
    const ordersWithProducts = []

    for (const order of orders) {
      const orderWithProducts = {
        ...order.toObject(),
        items: [],
      }

      for (const item of order.items) {
        const product = await Product.findOne({ id: item.productId })
        orderWithProducts.items.push({
          ...item.toObject(),
          product: product ? product.toObject() : null,
        })
      }

      ordersWithProducts.push(orderWithProducts)
    }

    res.json(ordersWithProducts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get all orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params
    const { status } = req.body

    const validStatuses = ["placed", "processing", "shipped", "delivered", "cancelled"]
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status. Valid statuses: " + validStatuses.join(", "),
      })
    }

    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true, runValidators: true })

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    res.json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
