// Mock payment processing
export const processPayment = async (req, res) => {
  try {
    const { orderId, total } = req.body

    if (!orderId || !total) {
      return res.status(400).json({
        message: "OrderId and total are required",
      })
    }

    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate random success/failure (80% success rate)
    const isSuccess = Math.random() > 0.2

    if (isSuccess) {
      res.json({
        success: true,
        message: "Payment processed successfully",
        orderId,
        total,
        transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      })
    } else {
      res.status(400).json({
        success: false,
        message: "Payment failed. Please try again.",
        orderId,
        total,
      })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
