# E-commerce Backend API

A complete e-commerce backend built with Node.js, Express, and MongoDB featuring products, cart, orders, and payment functionality.

## Features

- **Products Management**: CRUD operations, search, category filtering
- **Shopping Cart**: Add/remove items, quantity management, auto-calculate totals
- **Orders System**: Place orders from cart, order history, status updates
- **Mock Payment**: Simulated payment processing
- **MVC Architecture**: Clean, organized code structure

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- CORS middleware
- dotenv for environment variables

## Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a `.env` file with:
   \`\`\`
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   NODE_ENV=development
   \`\`\`

4. Start the server:
   \`\`\`bash
   npm start
   \`\`\`

   For development with auto-restart:
   \`\`\`bash
   npm run dev
   \`\`\`

## API Endpoints

### Products
- `GET /api/products` - Get all products (with optional search)
- `GET /api/products/category/:categoryName` - Get products by category
- `GET /api/products/sort/:categoryName` - Get sorted products by category
- `POST /api/products` - Add new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Cart
- `POST /api/cart` - Add item to cart
- `GET /api/cart/:userId` - Get cart items for user
- `PUT /api/cart/:userId` - Update item quantity
- `DELETE /api/cart/:userId/:productId` - Remove item from cart

### Orders
- `POST /api/orders` - Place new order from cart
- `GET /api/orders/:userId` - Get user's orders
- `GET /api/orders` - Get all orders (admin)
- `PUT /api/orders/:orderId` - Update order status

### Payment
- `POST /api/payment` - Process payment (mock)

## Sample Data

Run the seed script to populate the database with sample products:

\`\`\`bash
node scripts/seedProducts.js
\`\`\`

## Data Format

Products follow this structure:
\`\`\`json
{
  "id": 12,
  "title": "Product Title",
  "price": 114,
  "description": "Product description",
  "category": "electronics",
  "image": "https://example.com/image.jpg",
  "rating": {
    "rate": 4.8,
    "count": 400
  }
}
\`\`\`

## Error Handling

The API includes comprehensive error handling for:
- Validation errors
- Duplicate entries
- Not found resources
- Server errors

## Development

The project uses ES6+ modules and follows MVC architecture:
- `models/` - Database schemas
- `controllers/` - Business logic
- `routes/` - API endpoints
- `middleware/` - Custom middleware
- `config/` - Configuration files
