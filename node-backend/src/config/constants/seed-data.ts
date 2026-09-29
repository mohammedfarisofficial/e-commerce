import { Types } from "mongoose";

export interface SeedCategory {
  name: string;
  slug: string;
  image: string;
}

export interface SeedProduct {
  name: string;
  slug: string;
  brand: string;
  category?: Types.ObjectId;
  price: number;
  originalPrice: number;
  discount: number;
  images: string[];
}

export const SEED_CATEGORIES: SeedCategory[] = [
  { name: "Mobile", slug: "mobile", image: "https://via.placeholder.com/80?text=Mobile" },
  { name: "Cosmetics", slug: "cosmetics", image: "https://via.placeholder.com/80?text=Cosmetics" },
  { name: "Electronics", slug: "electronics", image: "https://via.placeholder.com/80?text=Electronics" },
  { name: "Furniture", slug: "furniture", image: "https://via.placeholder.com/80?text=Furniture" },
  { name: "Watches", slug: "watches", image: "https://via.placeholder.com/80?text=Watches" },
  { name: "Decor", slug: "decor", image: "https://via.placeholder.com/80?text=Decor" },
  { name: "Accessories", slug: "accessories", image: "https://via.placeholder.com/80?text=Accessories" },
];

export const SEED_PRODUCTS: Omit<SeedProduct, "category">[] = [
  {
    name: "Galaxy S22 Ultra",
    slug: "galaxy-s22-ultra",
    brand: "Samsung",
    price: 67999,
    originalPrice: 85999,
    discount: 21,
    images: ["https://via.placeholder.com/200x250?text=Galaxy+S22+Ultra"],
  },
  {
    name: "Galaxy M13 (4GB | 64 GB)",
    slug: "galaxy-m13",
    brand: "Samsung",
    price: 10499,
    originalPrice: 14999,
    discount: 30,
    images: ["https://via.placeholder.com/200x250?text=Galaxy+M13"],
  },
  {
    name: "Galaxy M33 (4GB | 64 GB)",
    slug: "galaxy-m33",
    brand: "Samsung",
    price: 16999,
    originalPrice: 24999,
    discount: 32,
    images: ["https://via.placeholder.com/200x250?text=Galaxy+M33"],
  },
  {
    name: "Galaxy M53 (4GB | 64 GB)",
    slug: "galaxy-m53",
    brand: "Samsung",
    price: 31999,
    originalPrice: 40999,
    discount: 22,
    images: ["https://via.placeholder.com/200x250?text=Galaxy+M53"],
  },
  {
    name: "Galaxy S22 Ultra 5G",
    slug: "galaxy-s22-ultra-5g",
    brand: "Samsung",
    price: 74999,
    originalPrice: 109999,
    discount: 32,
    images: ["https://via.placeholder.com/200x250?text=Galaxy+S22+Ultra+5G"],
  },
  {
    name: "Galaxy A54 (8GB | 128 GB)",
    slug: "galaxy-a54",
    brand: "Samsung",
    price: 29999,
    originalPrice: 38999,
    discount: 23,
    images: ["https://via.placeholder.com/200x250?text=Galaxy+A54"],
  },
  {
    name: "Galaxy Z Flip5",
    slug: "galaxy-z-flip5",
    brand: "Samsung",
    price: 99999,
    originalPrice: 109999,
    discount: 9,
    images: ["https://via.placeholder.com/200x250?text=Galaxy+Z+Flip5"],
  },
  {
    name: "Galaxy A34 5G",
    slug: "galaxy-a34-5g",
    brand: "Samsung",
    price: 25999,
    originalPrice: 33999,
    discount: 24,
    images: ["https://via.placeholder.com/200x250?text=Galaxy+A34+5G"],
  },
  {
    name: "Galaxy F14 5G",
    slug: "galaxy-f14-5g",
    brand: "Samsung",
    price: 11999,
    originalPrice: 16999,
    discount: 29,
    images: ["https://via.placeholder.com/200x250?text=Galaxy+F14+5G"],
  },
  {
    name: "Galaxy S23 FE",
    slug: "galaxy-s23-fe",
    brand: "Samsung",
    price: 49999,
    originalPrice: 59999,
    discount: 17,
    images: ["https://via.placeholder.com/200x250?text=Galaxy+S23+FE"],
  },
  {
    name: "Galaxy A14 (4GB | 64 GB)",
    slug: "galaxy-a14",
    brand: "Samsung",
    price: 9499,
    originalPrice: 13999,
    discount: 32,
    images: ["https://via.placeholder.com/200x250?text=Galaxy+A14"],
  },
  {
    name: "Galaxy Z Fold5",
    slug: "galaxy-z-fold5",
    brand: "Samsung",
    price: 154999,
    originalPrice: 184999,
    discount: 16,
    images: ["https://via.placeholder.com/200x250?text=Galaxy+Z+Fold5"],
  },
  {
    name: "Galaxy A25 5G",
    slug: "galaxy-a25-5g",
    brand: "Samsung",
    price: 19999,
    originalPrice: 26999,
    discount: 26,
    images: ["https://via.placeholder.com/200x250?text=Galaxy+A25+5G"],
  },
  {
    name: "Galaxy M34 5G",
    slug: "galaxy-m34-5g",
    brand: "Samsung",
    price: 18999,
    originalPrice: 24999,
    discount: 24,
    images: ["https://via.placeholder.com/200x250?text=Galaxy+M34+5G"],
  },
  {
    name: "Galaxy F54 5G",
    slug: "galaxy-f54-5g",
    brand: "Samsung",
    price: 27999,
    originalPrice: 34999,
    discount: 20,
    images: ["https://via.placeholder.com/200x250?text=Galaxy+F54+5G"],
  },
];
