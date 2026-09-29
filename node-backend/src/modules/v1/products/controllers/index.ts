import { Request, Response } from "express";
import { asyncHandler, JSON200, JSON404 } from "../../../../utils";
import { ProductRepository, CategoryRepository } from "../repository";

export const productControllers = {
    getProducts: asyncHandler(async (req: Request, res: Response) => {
        const { category } = req.query;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        let products;
        let totalCount;
        if (category) {
            products = await ProductRepository.findByCategorySlug(category as string, limit, skip);
            totalCount = await ProductRepository.countByCategorySlug(category as string);
        } else {
            products = await ProductRepository.findAll(limit, skip);
            totalCount = await ProductRepository.countAll();
        }
        
        const hasMore = skip + products.length < totalCount;
        
        JSON200(res, { 
            products, 
            pagination: { page, limit, total: totalCount, hasMore }
        });
    }),
    
    getProductBySlug: asyncHandler(async (req: Request, res: Response) => {
        const { slug } = req.params;
        const product = await ProductRepository.findBySlug(slug as string);
        if (!product) {
            JSON404(res, "Product not found");
            return;
        }
        JSON200(res, { product });
    }),

    getCategories: asyncHandler(async (req: Request, res: Response) => {
        const categories = await CategoryRepository.findAll();
        JSON200(res, { categories });
    })
};
