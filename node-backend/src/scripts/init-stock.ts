import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../modules/v1/products/models/product";

dotenv.config();

const initStock = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce";
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB for initializing stock...");

    const products = await Product.find({});
    
    // Set 5 products to stock 1 to easily test overselling, others random between 5 and 20
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      if (i < 5) {
        product.stock = 1;
      } else {
        product.stock = Math.floor(Math.random() * (20 - 5 + 1) + 5);
      }
      await product.save();
    }
    
    console.log(`Initialized stock for ${products.length} products.`);
    process.exit(0);
  } catch (error) {
    console.error("Error initializing stock:", error);
    process.exit(1);
  }
};

initStock();
