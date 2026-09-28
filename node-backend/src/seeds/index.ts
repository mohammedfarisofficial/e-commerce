import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db";
import { users } from "./data/users";
import { EncryptionUtils } from "../utils";
import { products } from "./data/products";
import { categories } from "./data/categories";
import User from "../modules/v1/users/models/user";
import Product from "../modules/v1/products/models/product";
import Category from "../modules/v1/products/models/category";
import { USER_ROLES } from "../modules/v1/users/models/user/constants";
import ProductVariant from "../modules/v1/products/models/product-variant";

dotenv.config();

const seedData = async () => {
    try {
        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected to database successfully.");

        // Clear existing data
        console.log("Clearing existing data...");
        await Category.deleteMany({});
        await Product.deleteMany({});
        await ProductVariant.deleteMany({});
        await User.deleteMany({});
        console.log("Existing data cleared.");

        // Seed Categories
        console.log("Seeding categories...");
        const createdCategories = await Category.insertMany(categories);
        console.log(`Seeded ${createdCategories.length} categories.`);

        // Create a map of category slug to ObjectId for quick lookup
        const categoryMap = createdCategories.reduce((acc, cat) => {
            acc[cat.slug] = cat._id as mongoose.Types.ObjectId;
            return acc;
        }, {} as Record<string, mongoose.Types.ObjectId>);

        // Seed Products and Variants
        console.log("Seeding products and variants...");
        for (const productData of products) {
            const { variants, categorySlug, ...productInfo } = productData;

            const categoryId = categoryMap[categorySlug];
            if (!categoryId) {
                console.warn(`Category slug '${categorySlug}' not found for product '${productInfo.name}'. Skipping.`);
                continue;
            }

            const product = await Product.create({
                ...productInfo,
                category: categoryId,
                variants: [],
            });

            const createdVariants = [];
            for (const variantData of variants) {
                const variant = await ProductVariant.create({
                    ...variantData,
                    product_id: product._id,
                });
                createdVariants.push(variant._id);
            }

            product.variants = createdVariants as mongoose.Types.ObjectId[];
            await product.save();
        }
        console.log(`Seeded ${products.length} products with their variants.`);

        // Seed Users
        console.log("Seeding users...");
        for (const userData of users) {
            const hashedPassword = await EncryptionUtils.encrypt(userData.password);
            await User.create({
                ...userData,
                password: hashedPassword,
                role: USER_ROLES.ADMIN
            });
        }
        console.log(`Seeded ${users.length} users.`);

        console.log("Seeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error during seeding:", error);
        process.exit(1);
    }
};

seedData();
