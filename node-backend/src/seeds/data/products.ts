export const products = [
    // --- Mobile ---
    {
        name: "Galaxy S22 Ultra", slug: "galaxy-s22-ultra", brand: "Samsung", categorySlug: "mobile",
        description: "Samsung Galaxy S22 Ultra", images: ["s22-ultra.jpg"],
        variants: [
            { sku: "SAM-S22U-12-256", size: "12GB | 256GB", colour: "Phantom Black", price: 67999, original_price: 85999, stock: 50 }
        ]
    },
    {
        name: "Galaxy M13", slug: "galaxy-m13", brand: "Samsung", categorySlug: "mobile",
        description: "Samsung Galaxy M13", images: ["m13.jpg"],
        variants: [
            { sku: "SAM-M13-4-64", size: "4GB | 64GB", colour: "Brown", price: 10499, original_price: 14999, stock: 100 }
        ]
    },
    {
        name: "iPhone 14 Pro", slug: "iphone-14-pro", brand: "Apple", categorySlug: "mobile",
        description: "Apple iPhone 14 Pro", images: ["iphone14pro.jpg"],
        variants: [
            { sku: "APP-IP14P-128", size: "128GB", colour: "Deep Purple", price: 129900, original_price: 139900, stock: 30 }
        ]
    },
    {
        name: "OnePlus 11 5G", slug: "oneplus-11-5g", brand: "OnePlus", categorySlug: "mobile",
        description: "OnePlus 11 5G", images: ["op11.jpg"],
        variants: [
            { sku: "OP-11-8-128", size: "8GB | 128GB", colour: "Titan Black", price: 56999, original_price: 61999, stock: 45 }
        ]
    },
    {
        name: "Pixel 7 Pro", slug: "pixel-7-pro", brand: "Google", categorySlug: "mobile",
        description: "Google Pixel 7 Pro", images: ["pixel7pro.jpg"],
        variants: [
            { sku: "GOO-P7P-128", size: "12GB | 128GB", colour: "Hazel", price: 84999, original_price: 89999, stock: 25 }
        ]
    },

    // --- Cosmetics ---
    {
        name: "Matte Lipstick", slug: "matte-lipstick", brand: "MAC", categorySlug: "cosmetics",
        description: "Long lasting matte lipstick", images: ["lipstick.jpg"],
        variants: [
            { sku: "MAC-LIP-RUBY", size: "3g", colour: "Ruby Woo", price: 1950, original_price: 2100, stock: 150 }
        ]
    },
    {
        name: "Liquid Foundation", slug: "liquid-foundation", brand: "Maybelline", categorySlug: "cosmetics",
        description: "Fit Me Matte + Poreless", images: ["foundation.jpg"],
        variants: [
            { sku: "MAY-FIT-128", size: "30ml", colour: "Warm Nude", price: 549, original_price: 699, stock: 200 }
        ]
    },
    {
        name: "Waterproof Eyeliner", slug: "waterproof-eyeliner", brand: "L'Oreal", categorySlug: "cosmetics",
        description: "Smudge-proof waterproof eyeliner", images: ["eyeliner.jpg"],
        variants: [
            { sku: "LOR-EYE-BLK", size: "1.2g", colour: "Black", price: 499, original_price: 599, stock: 120 }
        ]
    },
    {
        name: "Daily Moisturizer", slug: "daily-moisturizer", brand: "Cetaphil", categorySlug: "cosmetics",
        description: "Daily facial moisturizer for sensitive skin", images: ["moisturizer.jpg"],
        variants: [
            { sku: "CET-MOI-100", size: "100ml", colour: "N/A", price: 850, original_price: 950, stock: 80 }
        ]
    },
    {
        name: "Eau De Parfum", slug: "eau-de-parfum", brand: "Chanel", categorySlug: "cosmetics",
        description: "Classic Chanel No.5", images: ["perfume.jpg"],
        variants: [
            { sku: "CHA-NO5-50", size: "50ml", colour: "N/A", price: 12500, original_price: 13000, stock: 10 }
        ]
    },

    // --- Electronics ---
    {
        name: "Bravia 4K TV", slug: "bravia-4k-tv", brand: "Sony", categorySlug: "electronics",
        description: "Sony Bravia 55 inch 4K Ultra HD Smart LED TV", images: ["tv.jpg"],
        variants: [
            { sku: "SON-TV-55", size: "55 Inch", colour: "Black", price: 65990, original_price: 99900, stock: 15 }
        ]
    },
    {
        name: "MacBook Air M2", slug: "macbook-air-m2", brand: "Apple", categorySlug: "electronics",
        description: "Apple MacBook Air with M2 chip", images: ["macbook.jpg"],
        variants: [
            { sku: "APP-MBA-M2-256", size: "8GB | 256GB", colour: "Midnight", price: 105990, original_price: 114900, stock: 25 }
        ]
    },
    {
        name: "WH-1000XM5 Headphones", slug: "sony-wh-1000xm5", brand: "Sony", categorySlug: "electronics",
        description: "Noise cancelling wireless headphones", images: ["headphones.jpg"],
        variants: [
            { sku: "SON-WH-XM5-BLK", size: "Standard", colour: "Black", price: 26990, original_price: 34990, stock: 40 }
        ]
    },
    {
        name: "SoundLink Micro", slug: "bose-soundlink-micro", brand: "Bose", categorySlug: "electronics",
        description: "Bluetooth speaker, waterproof", images: ["speaker.jpg"],
        variants: [
            { sku: "BOS-SLM-BLU", size: "Standard", colour: "Midnight Blue", price: 8990, original_price: 10900, stock: 60 }
        ]
    },

    // --- Furniture ---
    {
        name: "3-Seater Sofa", slug: "3-seater-sofa", brand: "IKEA", categorySlug: "furniture",
        description: "Comfortable fabric 3-seater sofa", images: ["sofa.jpg"],
        variants: [
            { sku: "IKE-SOF-3-GRY", size: "200x80cm", colour: "Grey", price: 25990, original_price: 35000, stock: 10 }
        ]
    },
    {
        name: "Queen Size Bed", slug: "queen-size-bed", brand: "Wakefit", categorySlug: "furniture",
        description: "Engineered wood queen size bed", images: ["bed.jpg"],
        variants: [
            { sku: "WAK-BED-QN-BRN", size: "Queen", colour: "Walnut", price: 15499, original_price: 21999, stock: 12 }
        ]
    },
    {
        name: "Dining Table Set", slug: "dining-table-set", brand: "HomeTown", categorySlug: "furniture",
        description: "4-seater wooden dining table", images: ["dining.jpg"],
        variants: [
            { sku: "HOM-DIN-4-BRN", size: "4 Seater", colour: "Teak", price: 18999, original_price: 28000, stock: 8 }
        ]
    },

    // --- Watches ---
    {
        name: "G-Shock Digital", slug: "g-shock-digital", brand: "Casio", categorySlug: "watches",
        description: "Tough water resistant digital watch", images: ["gshock.jpg"],
        variants: [
            { sku: "CAS-GS-BLK", size: "Standard", colour: "Black", price: 6495, original_price: 6995, stock: 50 }
        ]
    },
    {
        name: "Chronograph Watch", slug: "fossil-chronograph", brand: "Fossil", categorySlug: "watches",
        description: "Men's chronograph leather watch", images: ["fossil.jpg"],
        variants: [
            { sku: "FOS-CHR-BRN", size: "44mm", colour: "Brown Leather", price: 11995, original_price: 13495, stock: 30 }
        ]
    },
    {
        name: "Apple Watch Series 8", slug: "apple-watch-8", brand: "Apple", categorySlug: "watches",
        description: "Smartwatch with health tracking", images: ["applewatch.jpg"],
        variants: [
            { sku: "APP-AW8-41-MID", size: "41mm", colour: "Midnight", price: 41900, original_price: 45900, stock: 25 }
        ]
    },

    // --- Decor ---
    {
        name: "Ceramic Flower Vase", slug: "ceramic-vase", brand: "HomeCentre", categorySlug: "decor",
        description: "Elegant white ceramic vase", images: ["vase.jpg"],
        variants: [
            { sku: "HC-VAS-WHT", size: "Medium", colour: "White", price: 1299, original_price: 1999, stock: 100 }
        ]
    },
    {
        name: "Abstract Canvas Art", slug: "canvas-art", brand: "Artisan", categorySlug: "decor",
        description: "Modern abstract canvas wall art", images: ["art.jpg"],
        variants: [
            { sku: "ART-CAN-ABS", size: "60x90cm", colour: "Multi", price: 2499, original_price: 3999, stock: 20 }
        ]
    },
    {
        name: "Floor Lamp", slug: "floor-lamp", brand: "Philips", categorySlug: "decor",
        description: "Minimalist LED floor lamp", images: ["lamp.jpg"],
        variants: [
            { sku: "PHI-FLM-BLK", size: "150cm", colour: "Black", price: 3499, original_price: 4500, stock: 15 }
        ]
    },

    // --- Accessories ---
    {
        name: "Leather Wallet", slug: "leather-wallet", brand: "Tommy Hilfiger", categorySlug: "accessories",
        description: "Genuine leather bi-fold wallet", images: ["wallet.jpg"],
        variants: [
            { sku: "TH-WAL-BRN", size: "Standard", colour: "Brown", price: 2199, original_price: 2999, stock: 60 }
        ]
    },
    {
        name: "Aviator Sunglasses", slug: "aviator-sunglasses", brand: "Ray-Ban", categorySlug: "accessories",
        description: "Classic aviator sunglasses", images: ["sunglasses.jpg"],
        variants: [
            { sku: "RAY-AVI-GLD", size: "Standard", colour: "Gold/Green", price: 5490, original_price: 6490, stock: 45 }
        ]
    },

    // --- Fruits ---
    {
        name: "Fuji Apples", slug: "fuji-apples", brand: "FreshFarm", categorySlug: "fruits",
        description: "Fresh, crisp Fuji apples", images: ["apples.jpg"],
        variants: [
            { sku: "FRU-APP-1KG", size: "1 kg", colour: "Red", price: 250, original_price: 300, stock: 200 }
        ]
    },
    {
        name: "Robusta Bananas", slug: "robusta-bananas", brand: "FreshFarm", categorySlug: "fruits",
        description: "Fresh Robusta Bananas", images: ["bananas.jpg"],
        variants: [
            { sku: "FRU-BAN-1KG", size: "1 kg", colour: "Yellow", price: 60, original_price: 80, stock: 300 }
        ]
    },

    // --- Vegetables ---
    {
        name: "Red Onions", slug: "red-onions", brand: "FreshFarm", categorySlug: "vegetables",
        description: "Fresh red onions", images: ["onions.jpg"],
        variants: [
            { sku: "VEG-ONI-1KG", size: "1 kg", colour: "Red", price: 40, original_price: 60, stock: 500 }
        ]
    },
    {
        name: "Potatoes", slug: "potatoes", brand: "FreshFarm", categorySlug: "vegetables",
        description: "Fresh farm potatoes", images: ["potatoes.jpg"],
        variants: [
            { sku: "VEG-POT-1KG", size: "1 kg", colour: "Brown", price: 35, original_price: 50, stock: 400 }
        ]
    },
    {
        name: "Tomatoes", slug: "tomatoes", brand: "FreshFarm", categorySlug: "vegetables",
        description: "Fresh red tomatoes", images: ["tomatoes.jpg"],
        variants: [
            { sku: "VEG-TOM-1KG", size: "1 kg", colour: "Red", price: 30, original_price: 45, stock: 250 }
        ]
    }
];
