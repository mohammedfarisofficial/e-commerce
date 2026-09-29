import mongoose from "mongoose";
import Product from "../modules/v1/products/models/product";
import Category from "../modules/v1/products/models/category";
import { SEED_CATEGORIES, SEED_PRODUCTS } from "./constants/seed-data";

export const seedDatabase = async (): Promise<void> => {
  const productCount = await Product.countDocuments();
  if (productCount > 0) return;

  console.log("Database is empty. Seeding data...");

  const insertedCategories = await Category.insertMany(SEED_CATEGORIES);
  const mobileCategory = insertedCategories.find((c) => c.slug === "mobile");

  if (mobileCategory) {
    const productsWithCategory = SEED_PRODUCTS.map((p) => ({
      ...p,
      category: mobileCategory._id,
    }));
    await Product.insertMany(productsWithCategory);
  }

  console.log("DB seeded successfully!");
};
