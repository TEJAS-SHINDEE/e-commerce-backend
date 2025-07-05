import Product from "../models/Product.js"

// Get all products with optional search
export const getProducts = async (req, res) => {
  try {
    const { search } = req.query
    let query = {}

    if (search) {
      query = {
        $or: [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }],
      }
    }

    const products = await Product.find(query)
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryName } = req.params
    const products = await Product.find({
      category: categoryName.toLowerCase(),
    })
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get products by category (sorted)
export const getSortedProductsByCategory = async (req, res) => {
  try {
    const { categoryName } = req.params
    const products = await Product.find({
      category: categoryName.toLowerCase(),
    }).sort({ price: 1 }) // Sort by price ascending
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Add new product
export const addProduct = async (req, res) => {
  try {
    const { id, title, description, price, category, image, rating } = req.body

    // Check if product with this ID already exists
    const existingProduct = await Product.findOne({ id })
    if (existingProduct) {
      return res.status(400).json({ message: "Product with this ID already exists" })
    }

    const product = new Product({
      id,
      title,
      description,
      price,
      category: category.toLowerCase(),
      image,
      rating: rating || { rate: 0, count: 0 },
    })

    const savedProduct = await product.save()
    res.status(201).json(savedProduct)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    if (updateData.category) {
      updateData.category = updateData.category.toLowerCase()
    }

    const product = await Product.findOneAndUpdate({ id: Number.parseInt(id) }, updateData, {
      new: true,
      runValidators: true,
    })

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.json(product)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findOneAndDelete({ id: Number.parseInt(id) })

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.json({ message: "Product deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
