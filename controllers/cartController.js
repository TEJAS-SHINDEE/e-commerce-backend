import Cart from "../models/Cart.js"
import Product from "../models/Product.js"

// Calculate cart total
const calculateCartTotal = async (items) => {
  let total = 0
  for (const item of items) {
    const product = await Product.findOne({ id: item.productId })
    if (product) {
      total += product.price * item.quantity
    }
  }
  return total
}

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity = 1 } = req.body

    if (!userId || !productId) {
      return res.status(400).json({ message: "UserId and productId are required" })
    }

    // Check if product exists
    const product = await Product.findOne({ id: productId })
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    let cart = await Cart.findOne({ userId })

    if (!cart) {
      // Create new cart
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      })
    } else {
      // Check if item already exists in cart
      const existingItemIndex = cart.items.findIndex((item) => item.productId === productId)

      if (existingItemIndex > -1) {
        // Update quantity
        cart.items[existingItemIndex].quantity += quantity
      } else {
        // Add new item
        cart.items.push({ productId, quantity })
      }
    }

    // Calculate total
    cart.total = await calculateCartTotal(cart.items)
    await cart.save()

    res.json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get cart items for a user
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params

    const cart = await Cart.findOne({ userId })
    if (!cart) {
      return res.json({ userId, items: [], total: 0 })
    }

    // Populate with product details
    const cartWithProducts = {
      ...cart.toObject(),
      items: [],
    }

    for (const item of cart.items) {
      const product = await Product.findOne({ id: item.productId })
      if (product) {
        cartWithProducts.items.push({
          ...item.toObject(),
          product: product.toObject(),
        })
      }
    }

    res.json(cartWithProducts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update item quantity in cart
export const updateCartItem = async (req, res) => {
  try {
    const { userId } = req.params
    const { productId, quantity } = req.body

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" })
    }

    const cart = await Cart.findOne({ userId })
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" })
    }

    const itemIndex = cart.items.findIndex((item) => item.productId === productId)
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" })
    }

    cart.items[itemIndex].quantity = quantity
    cart.total = await calculateCartTotal(cart.items)
    await cart.save()

    res.json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params

    const cart = await Cart.findOne({ userId })
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" })
    }

    cart.items = cart.items.filter((item) => item.productId !== Number.parseInt(productId))
    cart.total = await calculateCartTotal(cart.items)
    await cart.save()

    res.json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
