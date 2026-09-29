import Product from "../models/product";
import Category from "../models/category";
import "../models/product-variant"; // Register ProductVariant schema for population
import type { ProductDocument } from "../models/product/types";

export const ProductRepository = {
    async findAll(limit: number = 10, skip: number = 0): Promise<ProductDocument[]> {
        return Product.find().skip(skip).limit(limit).populate("category").populate("variants");
    },
    async findByCategorySlug(slug: string, limit: number = 10, skip: number = 0): Promise<ProductDocument[]> {
        const category = await Category.findOne({ slug });
        if (!category) return [];
        return Product.find({ category: category._id }).skip(skip).limit(limit).populate("category").populate("variants");
    },
    async countAll(): Promise<number> {
        return Product.countDocuments();
    },
    async countByCategorySlug(slug: string): Promise<number> {
        const category = await Category.findOne({ slug });
        if (!category) return 0;
        return Product.countDocuments({ category: category._id });
    },
    async findBySlug(slug: string): Promise<ProductDocument | null> {
        return Product.findOne({ slug }).populate("category").populate("variants");
    }
} as const;

export const CategoryRepository = {
    async findAll() {
        return Category.find();
    }
} as const;
