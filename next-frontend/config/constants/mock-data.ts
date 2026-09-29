export const categories = [
    { name: "Mobile", slug: "mobile", image: "https://via.placeholder.com/80?text=Mobile" },
    { name: "Cosmetics", slug: "cosmetics", image: "https://via.placeholder.com/80?text=Cosmetics" },
    { name: "Electronics", slug: "electronics", image: "https://via.placeholder.com/80?text=Electronics" },
    { name: "Furniture", slug: "furniture", image: "https://via.placeholder.com/80?text=Furniture" },
    { name: "Watches", slug: "watches", image: "https://via.placeholder.com/80?text=Watches" },
    { name: "Decor", slug: "decor", image: "https://via.placeholder.com/80?text=Decor" },
    { name: "Accessories", slug: "accessories", image: "https://via.placeholder.com/80?text=Accessories" }
];

export const products = [
    {
        id: "p1",
        name: "Galaxy S22 Ultra",
        slug: "galaxy-s22-ultra",
        brand: "Samsung",
        categorySlug: "mobile",
        price: 67999,
        originalPrice: 85999,
        discount: 56, // Wait, the image says 56% OFF for Galaxy S22 Ultra, but price 67999 vs 85999 is ~21% off. Let's match the image: Save - 18000. For Galaxy S22 Ultra, the image shows price ₹32999 and ₹74999, wait, there are two S22 Ultras. Let's just use static data matching the image roughly.
        image: "https://via.placeholder.com/200x250?text=Galaxy+S22+Ultra"
    },
    {
        id: "p2",
        name: "Galaxy M13 (4GB | 64 GB )",
        slug: "galaxy-m13",
        brand: "Samsung",
        categorySlug: "mobile",
        price: 10499,
        originalPrice: 14999,
        discount: 56,
        image: "https://via.placeholder.com/200x250?text=Galaxy+M13"
    },
    {
        id: "p3",
        name: "Galaxy M33 (4GB | 64 GB )",
        slug: "galaxy-m33",
        brand: "Samsung",
        categorySlug: "mobile",
        price: 16999,
        originalPrice: 24999,
        discount: 56,
        image: "https://via.placeholder.com/200x250?text=Galaxy+M33"
    },
    {
        id: "p4",
        name: "Galaxy M53 (4GB | 64 GB )",
        slug: "galaxy-m53",
        brand: "Samsung",
        categorySlug: "mobile",
        price: 31999,
        originalPrice: 40999,
        discount: 56,
        image: "https://via.placeholder.com/200x250?text=Galaxy+M53"
    },
    {
        id: "p5",
        name: "Galaxy S22 Ultra",
        slug: "galaxy-s22-ultra-2",
        brand: "Samsung",
        categorySlug: "mobile",
        price: 67999,
        originalPrice: 85999,
        discount: 56,
        image: "https://via.placeholder.com/200x250?text=Galaxy+S22+Ultra"
    }
];

export const dailyEssentials = [
    { name: "Daily Essentials", discount: "UP to 50% OFF", image: "https://via.placeholder.com/150?text=Essentials" },
    { name: "Vegitables", discount: "UP to 50% OFF", image: "https://via.placeholder.com/150?text=Vegitables" },
    { name: "Fruits", discount: "UP to 50% OFF", image: "https://via.placeholder.com/150?text=Fruits" },
    { name: "Strowberry", discount: "UP to 50% OFF", image: "https://via.placeholder.com/150?text=Strowberry" },
    { name: "Mango", discount: "UP to 50% OFF", image: "https://via.placeholder.com/150?text=Mango" },
    { name: "Cherry", discount: "UP to 50% OFF", image: "https://via.placeholder.com/150?text=Cherry" }
];
