import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../modules/v1/products/models/product";

dotenv.config();

const fixPrices = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce";
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB for fixing prices...");

    const products = await Product.find({ price: { $in: [0, null] } });
    
    for (const product of products) {
      product.price = Math.floor(Math.random() * (50000 - 10000 + 1) + 10000); // Random price between 10k and 50k
      product.originalPrice = Math.floor(product.price * 1.2);
      product.discount = 20;
      await product.save();
    }
    
    console.log(`Fixed prices for ${products.length} products.`);
    process.exit(0);
  } catch (error) {
    console.error("Error fixing prices:", error);
    process.exit(1);
  }
};

fixPrices();
