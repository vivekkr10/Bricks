const productsData = [
  {
    id: 1,
    name: "Classic Red Premium Brick",
    shortDescription: "Traditional warm red clay bricks for timeless construction",
    fullDescription: "Our Classic Red Premium Bricks are manufactured using traditional clay firing methods, producing rich warm red tones. These bricks offer excellent durability and aesthetic appeal, ideal for residential and commercial projects where warmth and character are desired. The vibrant red color retains richness for decades.",
    specifications: {
      strength: "7.5 N/mm²",
      size: "9\" x 4\" x 3\"",
      weight: "3.2 kg",
      waterAbsorption: "< 10%",
      tolerance: "± 2 mm",
      thermalConductivity: "0.8-1.2 W/mK",
      soundInsulation: "45 dB",
      fireResistance: "Class A (4 hours)"
    },
    manufacturingType: "Traditional Clay Firing",
    applicationAreas: [
      "Residential Buildings",
      "Heritage Projects",
      "Classic Architecture",
      "Face Brickwork",
      "Decorative Walls",
      "Premium Exteriors"
    ],
    usageType: "Facade and Structural Walls",
    image: "https://imgs.search.brave.com/AzPQ__YBQbMVOokRYNfsvMwDjBflQcFa0NJSI0KztKc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bGF3c29ucy5jby51/ay9tZWRpYS9jYXRh/bG9nL3Byb2R1Y3Qv/dy9hL3dhcm5oYW1f/MjB0ZXJyYWNvdHRh/XzIwYnJpY2tzLTI3/ODY1LWV4dHJhLWxh/cmdlXzEuanBnP29w/dGltaXplPW1lZGl1/bSZiZy1jb2xvcj0y/NTUsMjU1LDI1NSZm/aXQ9Ym91bmRzJmhl/aWdodD0zMjAmd2lk/dGg9MzIwJmNhbnZh/cz0zMjA6MzIw",
    gallery: [
      "/images/classic-red-brick-1.jpg",
      "/images/classic-red-brick-2.jpg",
      "/images/classic-red-brick-3.jpg",
      "/images/classic-red-brick-4.jpg"
    ],
    category: "Classic Reds",
    features: [
      "Rich warm red color",
      "Traditional clay fired",
      "Excellent durability",
      "Timeless aesthetic appeal",
      "Retains color for decades",
      "Perfect for heritage projects"
    ],
    certifications: ["ISO 9001:2015", "ISI Marked"],
    minOrderQuantity: 5000,
    deliveryTime: "7-10 days",
    warranty: "5 years against manufacturing defects",
    active: true,
    rating: 4.8,
    reviews: 234,
    inStock: true
  },
  {
    id: 2,
    name: "Multicolor Blend Brick",
    shortDescription: "Vibrant multi-colored bricks for distinctive architecture",
    fullDescription: "Multicolor blend bricks feature a beautiful mix of red, brown, and orange hues creating a dynamic, textured appearance. Perfect for projects seeking visual interest and personality. The varied coloring adds character to any structure while maintaining the durability of quality clay construction. Each brick is unique.",
    specifications: {
      strength: "5.5 N/mm²",
      size: "9\" x 4\" x 3\"",
      weight: "3.0 kg",
      waterAbsorption: "12-15%",
      tolerance: "± 3 mm",
      thermalConductivity: "0.6-0.8 W/mK",
      soundInsulation: "40 dB",
      fireResistance: "Class A (4 hours)"
    },
    manufacturingType: "Hand-Blended Clay Firing",
    applicationAreas: [
      "Traditional Architecture",
      "Heritage Properties",
      "Artistic Projects",
      "Feature Walls",
      "Gallery Spaces",
      "Character Buildings"
    ],
    usageType: "Aesthetic and Feature Walls",
    image: "https://imgs.search.brave.com/Yw5epWUYQtzziGgnxX0Mbp5NAw6eEWHGj3IN7K1GldU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWxjYW5mai5uaXRy/b2Nkbi5jb20vTGxy/VW1DaENYc2xETmt0/cHNDcFNXaW1Kd1Rh/bFJ2TFQvYXNzZXRz/L2ltYWdlcy9vcHRp/bWl6ZWQvcmV2LWY4/MTYxZDYvYnJpY2tt/eXdhbGxzLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMS8w/Ny9ibGVuZDF4Lmpw/Zw",
    gallery: [
      "/images/multi-color-brick-1.jpg",
      "/images/multi-color-brick-2.jpg",
      "/images/multi-color-brick-3.jpg"
    ],
    category: "Multis",
    features: [
      "Beautiful color variation",
      "Multi-toned appearance",
      "Creates visual interest",
      "Unique character",
      "Traditional craftsmanship",
      "Enhanced aesthetic value"
    ],
    certifications: ["ISO 9001:2015"],
    minOrderQuantity: 3000,
    deliveryTime: "5-7 days",
    warranty: "3 years",
    active: true,
    rating: 4.6,
    reviews: 189,
    inStock: false
  },
  {
    id: 3,
    name: "Dark Grey Solid Block",
    shortDescription: "Sophisticated dark grey bricks for contemporary design",
    fullDescription: "Dark grey solid blocks deliver a modern, sophisticated aesthetic perfect for contemporary architecture. These charcoal-grey bricks are manufactured for strength and consistency, offering a sleek appearance that complements modern landscaping and urban environments. The dark tone creates dramatic visual impact.",
    specifications: {
      strength: "10 N/mm²",
      size: "16\" x 8\" x 8\"",
      weight: "18 kg",
      waterAbsorption: "8%",
      tolerance: "± 2 mm",
      density: "2200 kg/m³",
      fireResistance: "Class A (6 hours)",
      soundInsulation: "50 dB"
    },
    manufacturingType: "Precision Grey Firing Process",
    applicationAreas: [
      "Modern Commercial",
      "Contemporary Homes",
      "Urban Architecture",
      "Accent Walls",
      "Industrial Lofts",
      "Contemporary Design"
    ],
    usageType: "Modern Aesthetic and Structural",
    image: "https://imgs.search.brave.com/pIqMbuUAsDaBuO864_xPnoBMnQ5b9s0CcKNKakO0VGE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZGRicy5jb20uYXUv/d3AtY29udGVudC91/cGxvYWRzLzIwMjEv/MDgvZGFyay1zaWx2/ZXItZ3JleS1ob21l/c3RlYWQtc29saWQt/YnJpY2tzLmpwZw",
    gallery: [
      "/images/dark-grey-block-1.jpg",
      "/images/dark-grey-block-2.jpg"
    ],
    category: "Darks",
    features: [
      "Sophisticated dark grey tone",
      "Modern aesthetic",
      "High structural strength",
      "Contemporary appeal",
      "Dramatic visual impact",
      "Excellent durability"
    ],
    certifications: ["ISO 9001:2015", "CE Marked"],
    minOrderQuantity: 2000,
    deliveryTime: "10-12 days",
    warranty: "10 years",
    active: true,
    rating: 4.9,
    reviews: 156,
    inStock: true
  },
  {
    id: 4,
    name: "Hamptons Light Brick",
    shortDescription: "Elegant light cream bricks inspired by Hamptons style",
    fullDescription: "Hamptons Light Bricks capture the essence of coastal elegance with their soft cream and pale beige tones. Designed to evoke the sophisticated architecture of the Hamptons, these bricks offer a refined, timeless aesthetic. Perfect for premium residential architecture and upscale commercial projects seeking understated luxury.",
    specifications: {
      strength: "4.5 N/mm²",
      size: "12\" x 8\" x 4\"",
      weight: "2.8 kg",
      waterAbsorption: "12%",
      thermalConductivity: "0.8 W/mK",
      soundInsulation: "42 dB",
      cavitySize: "2\" diameter",
      fireResistance: "Class B (2 hours)"
    },
    manufacturingType: "Coastal-Inspired Light Firing",
    applicationAreas: [
      "Premium Residences",
      "Coastal Projects",
      "Luxury Developments",
      "Upscale Exteriors",
      "Elegant Facades",
      "Designer Buildings"
    ],
    usageType: "Premium Facade Work",
    image: "https://imgs.search.brave.com/cVKg0qRTU0NxldwO6Cj0GEndkVFr0J7T3AesG249Plo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9saXJw/LmNkbi13ZWJzaXRl/LmNvbS9kNjI0MTM3/Ny9kbXMzcmVwL211/bHRpL29wdC9wZ2gt/YnJpY2tzXy1zaG9y/ZWxpbmVfZWxraG9y/bl8yMzB4MTEweDc2/LTE5MjB3LmpwZw",
    gallery: [
      "/images/hamptons-light-brick-1.jpg",
      "/images/hamptons-light-brick-2.jpg",
      "/images/hamptons-light-brick-3.jpg"
    ],
    category: "Hamptons",
    features: [
      "Elegant light cream tones",
      "Hamptons-style aesthetic",
      "Refined sophistication",
      "Coastal elegance",
      "Timeless and classic",
      "Premium appearance"
    ],
    certifications: ["Green Building Certified"],
    minOrderQuantity: 4000,
    deliveryTime: "5-7 days",
    warranty: "5 years",
    active: true,
    rating: 4.7,
    reviews: 98,
    inStock: true
  },
  {
    id: 5,
    name: "Yellow Gold Silicate Brick",
    shortDescription: "Warm golden-yellow bricks for premium facades",
    fullDescription: "Yellow Gold Silicate Bricks feature warm, rich golden-yellow tones that bring warmth and sophistication to any structure. Manufactured using precision autoclaved technology, these bricks offer exceptional consistency and durability. Ideal for high-end residential and commercial projects seeking a distinctive warm aesthetic.",
    specifications: {
      strength: "12 N/mm²",
      size: "9\" x 4\" x 3\"",
      weight: "3.5 kg",
      waterAbsorption: "7%",
      colorOptions: ["Grey", "White", "Cream", "Sandstone"],
      tolerance: "± 1 mm",
      density: "2000 kg/m³",
      fireResistance: "Class A (4 hours)"
    },
    manufacturingType: "Autoclaved Golden Firing",
    applicationAreas: [
      "Luxury Projects",
      "High-end Residences",
      "Premium Commercial",
      "Showcase Buildings",
      "High-visibility Projects",
      "Signature Architecture"
    ],
    usageType: "Premium Facade and Aesthetic",
    image: "https://imgs.search.brave.com/uZoo23saM2XVZkOG7JgFf9eAfS5eTJBW4ndwsABIfxc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi90ZXh0/dXJlLW1hZGUteWVs/bG93LW9sZC1icmlj/a3MtMTkxMzk2NDYz/LmpwZw",
    gallery: [
      "/images/yellow-gold-brick-1.jpg",
      "/images/yellow-gold-brick-2.jpg",
      "/images/yellow-gold-brick-3.jpg",
      "/images/yellow-gold-brick-4.jpg"
    ],
    category: "Yellows",
    features: [
      "Warm golden-yellow tones",
      "Premium facade finish",
      "Exceptional consistency",
      "High-end appearance",
      "Sophisticated warmth",
      "Distinct character"
    ],
    certifications: ["ISO 9001:2015", "CE Marked", "Green Label"],
    minOrderQuantity: 3000,
    deliveryTime: "8-10 days",
    warranty: "7 years",
    active: true,
    rating: 4.8,
    reviews: 67,
    inStock: false
  },
  {
    id: 6,
    name: "Rumbled Texture Brick",
    shortDescription: "Artisan rustic bricks with weathered rumbled finish",
    fullDescription: "Rumbled Texture Bricks feature a distinctive weathered, textured surface that evokes rustic charm and character. The tumbled finish gives each brick natural variation, creating authentic aged appearance perfect for heritage, country, and artisan-style projects. These bricks tell a story of craftsmanship and time.",
    specifications: {
      strength: "6 N/mm²",
      size: "12\" x 6\" x 4\"",
      weight: "4.5 kg",
      coverage: "2.5 bricks/m²",
      mortarSaving: "30%",
      laborSaving: "25%",
      waterAbsorption: "10%",
      tolerance: "± 3 mm"
    },
    manufacturingType: "Heritage Rumble Tumbling Process",
    applicationAreas: [
      "Heritage Restoration",
      "Country Estates",
      "Artisan Projects",
      "Historic Buildings",
      "Character Properties",
      "Rustic Architecture"
    ],
    usageType: "Heritage and Rustic Aesthetic",
    image: "https://imgs.search.brave.com/5W55riRd3XbMGIZNmVld0Q-Pj89pE9dT98PDn1W1D3E/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9icmlj/ay5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjUvMDEvMjAx/OTA3MTVfRUNfTGVh/Y3JvZnQuanBn",
    gallery: [
      "/images/rumbled-brick-1.jpg",
      "/images/rumbled-brick-2.jpg"
    ],
    category: "Rumbled",
    features: [
      "Rustic weathered texture",
      "Artisan crafted finish",
      "Natural color variation",
      "Aged character",
      "Heritage charm",
      "Time-honored aesthetic"
    ],
    certifications: ["ISO 9001:2015"],
    minOrderQuantity: 2500,
    deliveryTime: "5-6 days",
    warranty: "3 years",
    active: true,
    rating: 4.5,
    reviews: 45,
    inStock: true
  },
  {
    id: 7,
    name: "Reclaimed Vintage Brick",
    shortDescription: "Authentic salvaged bricks with historical character",
    fullDescription: "Reclaimed Vintage Bricks are carefully salvaged from historic buildings, carrying with them stories and patina of centuries. Each brick is unique with natural weathering, color variation, and authentic aging that cannot be replicated. Perfect for restoration projects and those seeking genuine antique character.",
    specifications: {
      strength: "4-8 N/mm²",
      size: "9\" x 4.5\" x 3\"",
      weight: "3.5-4.2 kg",
      waterAbsorption: "15-25%",
      tolerance: "Varied",
      thermalConductivity: "0.8-1.0 W/mK",
      soundInsulation: "45 dB",
      age: "50-200+ years"
    },
    manufacturingType: "Salvage and Restoration Processing",
    applicationAreas: [
      "Historic Restoration",
      "Period Properties",
      "Heritage Conservation",
      "Antique Preservation",
      "Listed Buildings",
      "Museum Projects"
    ],
    usageType: "Historic and Restoration Work",
    image: "https://imgs.search.brave.com/N4Fq89jX423mKZQKCvj7UbvFfDhfG2OSEaO18Q4GrOg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzgyNzQwOTQvci9p/bC83Yzc0NTgvMTcw/NDIzOTMzMS9pbF82/MDB4NjAwLjE3MDQy/MzkzMzFfYWdtMy5q/cGc",
    gallery: [
      "/images/reclaimed-brick-1.jpg",
      "/images/reclaimed-brick-2.jpg"
    ],
    category: "Reclaimed",
    features: [
      "Authentic vintage patina",
      "Historical character",
      "Unique aged appearance",
      "Salvaged from historic buildings",
      "One-of-a-kind bricks",
      "Genuine antique quality"
    ],
    certifications: ["Heritage Salvage Certified", "Conservation Grade"],
    minOrderQuantity: 500,
    deliveryTime: "14-21 days",
    warranty: "As-is vintage salvage",
    active: true,
    rating: 4.9,
    reviews: 34,
    inStock: false
  },
  {
    id: 8,
    name: "Classic Red Paver Block",
    shortDescription: "Premium red paver blocks for elegant outdoor spaces",
    fullDescription: "Classic Red Paver Blocks deliver the timeless warmth of traditional red clay in modern outdoor applications. These high-strength interlocking pavers feature rich red tones, perfect for driveways, patios, and landscaping. The vibrant color complements gardens and adds classic elegance to outdoor living spaces.",
    specifications: {
      strength: "45 N/mm²",
      thickness: "60mm / 80mm",
      shapes: ["Rectangular", "I-Shape", "Zigzag", "Circular"],
      colors: ["Red", "Grey", "Brown", "Multi"],
      waterAbsorption: "5%",
      abrasionResistance: "2.5 mm",
      skidResistance: "65 PTV"
    },
    manufacturingType: "Vibro-compression with Red Mix",
    applicationAreas: [
      "Outdoor Landscapes",
      "Garden Design",
      "Patio Construction",
      "Driveway Installation",
      "Pathway Creation",
      "Outdoor Living Spaces"
    ],
    usageType: "Outdoor Paving and Landscaping",
    image: "https://imgs.search.brave.com/xYnxzWvVPjzV2NDGGacswE53CbbvXgOAjxPxrmjHvmU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aWlt/Zy50aXN0YXRpYy5j/b20vZnAvMS8wMDQv/MjYxL3JlZC15ZWxs/b3ctcGF2ZXItYmxv/Y2tzLTEzMi5qcGc",
    gallery: [
      "/images/classic-red-paver-1.jpg",
      "/images/classic-red-paver-2.jpg",
      "/images/classic-red-paver-3.jpg"
    ],
    category: "Classic Reds",
    features: [
      "Vibrant classic red tones",
      "Premium paver quality",
      "Elegant outdoor appearance",
      "Warm aesthetic appeal",
      "Long-lasting color",
      "Perfect for gardens"
    ],
    certifications: ["ISO 9001:2015"],
    minOrderQuantity: 1000,
    deliveryTime: "5-7 days",
    warranty: "5 years",
    active: true,
    rating: 4.7,
    reviews: 78,
    inStock: true
  }
];

// Helper function to get products by category
export const getProductsByCategory = (category) => {
  return productsData.filter(product => product.category === category && product.active);
};

// Helper function to get featured products
export const getFeaturedProducts = () => {
  return productsData.filter(product => product.active && product.rating >= 4.7).slice(0, 4);
};

// Helper function to get new arrivals (simulated - last 3 products)
export const getNewArrivals = () => {
  return productsData.filter(product => product.active).slice(-3);
};

// Helper function to get product by ID
export const getProductById = (id) => {
  return productsData.find(product => product.id === parseInt(id));
};

// Get all categories
export const getAllCategories = () => {
  return [...new Set(productsData.map(product => product.category))];
};

// Get price range (mock function since prices are hidden)
export const getPriceRange = () => {
  return {
    min: "Inquiry Only",
    max: "Inquiry Only"
  };
};

export default productsData;