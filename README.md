# Megamart E-Commerce Platform

This is a modern e-commerce application with a full-stack architecture built using Next.js and Node.js/Express.

## Addressing Key Edge Cases (Interview Priorities)

### 1. Preventing Overselling (Race Conditions)
**The Problem:** If only one unit of a product is left, and two users hit the "Checkout" button at the exact same millisecond, standard application logic might let both go through, resulting in negative stock.
**Our Solution:** 
We prevent this at the database level by using **atomic `findOneAndUpdate` operations with MongoDB Transactions**. 
During checkout, the backend runs the following query for each cart item:
```javascript
const updatedProduct = await Product.findOneAndUpdate(
  { _id: product._id, stock: { $gte: item.quantity } }, // Condition: Must have enough stock
  { $inc: { stock: -item.quantity } },                   // Atomic decrement
  { session, new: true }
);
```
By including `stock: { $gte: item.quantity }` directly in the query criteria, MongoDB guarantees that the stock will **never** be decremented below zero, even under heavy concurrency. If the stock changes between the start of the checkout and the database execution, `updatedProduct` will return null, triggering an error that rolls back the entire transaction cleanly using `session.abortTransaction()`.

### 2. Handling Stale Carts
**The Problem:** A user adds an item to their cart, leaves it for hours, and then tries to check out. Meanwhile, the item went out of stock.
**Our Solution:**
1. **Frontend Warning:** The cart API includes the current live `stock` available for each item. The `CartPage` dynamically calculates if the requested `quantity` exceeds the available `stock`. If it does, the user sees an inline "Out of stock" or "Only X left in stock" warning directly in the cart UI.
2. **Disabled Checkout:** If any item in the cart is stale (requested quantity > available stock), the "Proceed to Checkout" button is immediately disabled, preventing the user from submitting a doomed request.
3. **Backend Validation:** Even if the user bypasses the UI and forces a checkout request, the backend performs a two-step verification:
   - **Pre-check:** It scans the cart items before opening a transaction. If it detects a stale item, it fails fast with a clean 400 error: `"Some items in your cart went out of stock. Please update your cart."`
   - **Atomic Check:** As mentioned above, the atomic `$gte` condition ensures that even if the item goes out of stock in the fraction of a second between the pre-check and the update, the transaction will fail cleanly and revert any partial changes, returning a precise error message.

## Setup Instructions

*Note: `.env` files for both the frontend and backend have been committed to the repository for ease of evaluation during this interview process. You do not need to manually configure environment variables to start the project.*

### Backend
1. Navigate to `node-backend`
2. Run `npm install`
3. Run `npm run dev` (or `npm run build` & `npm start`)

### Frontend
1. Navigate to `next-frontend`
2. Run `npm install`
3. Run `npm run dev` (or `npm run build` & `npm start`)

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Authenticate user and receive tokens
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user

### Products
- `GET /api/v1/products` - List all products
- `GET /api/v1/products/:slug` - Get product details by slug

### Cart & Checkout (Requires Authentication)
- `GET /api/v1/orders/cart` - Get user's active cart
- `POST /api/v1/orders/cart/add` - Add item to cart
- `PATCH /api/v1/orders/cart/:productId` - Update item quantity
- `DELETE /api/v1/orders/cart/:productId` - Remove item from cart
- `DELETE /api/v1/orders/cart` - Clear entire cart
- `POST /api/v1/orders/cart/checkout` - Process checkout (Atomically verifies stock before completing)