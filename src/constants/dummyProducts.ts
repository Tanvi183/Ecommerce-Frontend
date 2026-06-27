import type { Product } from "@/types";
import { dummyCategories } from "./dummyCategories";

export const dummyProducts: Product[] = [
  {
    id: "p1", name: "Flexible Soft Stone Wallpaper", slug: "flexible-soft-stone-wallpaper",
    description: "Premium 3D soft stone texture wallpaper for elegant interiors.",
    shortDescription: "3D stone texture wallpaper, waterproof and peel-safe.",
    price: 2800, originalPrice: 3500, discountPercent: 20,
    images: ["/product_wallpaper1.png", "/wallpaper_category.png"],
    thumbnail: "/product_wallpaper1.png",
    category: dummyCategories[0], categoryId: "c1",
    tags: ["wallpaper", "3d", "stone"], sku: "WP-001", stock: 50,
    rating: 4.7, reviewCount: 128, isNew: true, isFeatured: true,
    brand: "DecorPro", createdAt: "2025-01-10",
  },
  {
    id: "p2", name: "Premium SPC Oak Floor", slug: "premium-spc-oak-floor",
    description: "Waterproof SPC vinyl plank flooring with warm oak finish.",
    shortDescription: "Waterproof SPC, scratch-resistant, easy install.",
    price: 3500, originalPrice: 4200, discountPercent: 17,
    images: ["/product_floor1.png", "/floor_category.png"],
    thumbnail: "/product_floor1.png",
    category: dummyCategories[1], categoryId: "c2",
    tags: ["floor", "spc", "waterproof"], sku: "FL-001", stock: 35,
    rating: 4.8, reviewCount: 97, isNew: true, isBestSeller: true,
    brand: "FloorMaster", createdAt: "2025-02-05",
  },
  {
    id: "p3", name: "Zebra Roller Blind", slug: "zebra-roller-blind",
    description: "Premium zebra roller blind with day/night light control.",
    shortDescription: "Day-night roller blind, modern striped design.",
    price: 1200, originalPrice: 1500, discountPercent: 20,
    images: ["/product_blind1.png", "/blind_category.png"],
    thumbnail: "/product_blind1.png",
    category: dummyCategories[2], categoryId: "c3",
    tags: ["blind", "zebra", "roller"], sku: "BL-001", stock: 80,
    rating: 4.6, reviewCount: 64, isNew: true,
    brand: "SunShade", createdAt: "2025-03-01",
  },
  {
    id: "p4", name: "3D Wave Wall Panel", slug: "3d-wave-wall-panel",
    description: "Architectural 3D wave-pattern wall paneling for modern spaces.",
    shortDescription: "Lightweight, moisture-resistant 3D wall panel.",
    price: 2200, originalPrice: 2800, discountPercent: 21,
    images: ["/wall_panel_category.png"],
    thumbnail: "/wall_panel_category.png",
    category: dummyCategories[4], categoryId: "c5",
    tags: ["wall-panel", "3d", "modern"], sku: "WP-003", stock: 45,
    rating: 4.9, reviewCount: 42, isNew: true, isFeatured: true,
    brand: "PanelArt", createdAt: "2025-03-20",
  },
  {
    id: "p5", name: "Frosted Glass Sticker Film", slug: "frosted-glass-sticker",
    description: "Privacy frosted film for windows, doors and partitions.",
    shortDescription: "Easy peel-stick, UV-resistant frosted film.",
    price: 850, originalPrice: 1100, discountPercent: 23,
    images: ["/glass_paper_category.png"],
    thumbnail: "/glass_paper_category.png",
    category: dummyCategories[3], categoryId: "c4",
    tags: ["glass", "frosted", "privacy"], sku: "GP-001", stock: 120,
    rating: 4.5, reviewCount: 88, isNew: true, isOnSale: true,
    brand: "GlassDecor", createdAt: "2025-01-25",
  },
  {
    id: "p6", name: "Artificial Sport Turf Grass", slug: "artificial-sport-turf",
    description: "Premium artificial turf for balconies, gardens and sports courts.",
    shortDescription: "UV-resistant, dense, soft-feel artificial grass.",
    price: 200, originalPrice: 280, discountPercent: 29,
    images: ["/artificial_grass.png"],
    thumbnail: "/artificial_grass.png",
    category: dummyCategories[6], categoryId: "c7",
    tags: ["grass", "outdoor", "sport"], sku: "AG-001", stock: 200,
    rating: 4.4, reviewCount: 55, isNew: true, isHot: true,
    brand: "GreenLife", createdAt: "2025-02-14",
  },
  {
    id: "p7", name: "Marble Kitchen Cabinet Sticker", slug: "marble-kitchen-cabinet-sticker",
    description: "Self-adhesive marble-pattern vinyl for kitchen cabinets and countertops.",
    shortDescription: "Heat-resistant, waterproof vinyl cabinet wrap.",
    price: 680, originalPrice: 900, discountPercent: 24,
    images: ["/kitchen_sticker_category.png"],
    thumbnail: "/kitchen_sticker_category.png",
    category: dummyCategories[5], categoryId: "c6",
    tags: ["kitchen", "sticker", "marble"], sku: "KS-001", stock: 95,
    rating: 4.3, reviewCount: 73, isHot: true, isOnSale: true,
    brand: "KitchenStyle", createdAt: "2025-01-30",
  },
  {
    id: "p8", name: "Floral Botanical Wallpaper", slug: "floral-botanical-wallpaper",
    description: "Elegant botanical floral print wallpaper for living rooms and bedrooms.",
    shortDescription: "Lush botanical pattern, fade-resistant, easy paste.",
    price: 1800, originalPrice: 2200, discountPercent: 18,
    images: ["/wallpaper_category.png", "/product_wallpaper1.png"],
    thumbnail: "/wallpaper_category.png",
    category: dummyCategories[0], categoryId: "c1",
    tags: ["wallpaper", "floral", "botanical"], sku: "WP-002", stock: 60,
    rating: 4.6, reviewCount: 112, isBestSeller: true,
    brand: "NatureWall", createdAt: "2025-01-08",
  },
  {
    id: "p9", name: "Premium Wood Plank Floor", slug: "premium-wood-plank-floor",
    description: "Authentic-feel engineered wood plank flooring for premium interiors.",
    shortDescription: "Click-lock, 8mm thick, easy DIY install.",
    price: 4200, originalPrice: 5000, discountPercent: 16,
    images: ["/floor_category.png"],
    thumbnail: "/floor_category.png",
    category: dummyCategories[1], categoryId: "c2",
    tags: ["floor", "wood", "engineered"], sku: "FL-002", stock: 28,
    rating: 4.9, reviewCount: 43, isFeatured: true, isBestSeller: true,
    brand: "WoodCraft", createdAt: "2025-03-10",
  },
  {
    id: "p10", name: "3D Wallpaper Design — Galaxy", slug: "3d-wallpaper-galaxy",
    description: "Stunning cosmic galaxy 3D effect wallpaper, perfect for feature walls.",
    shortDescription: "Galaxy-print, vivid colours, high-res texture.",
    price: 1500, originalPrice: 1900, discountPercent: 21,
    images: ["/product_wallpaper1.png"],
    thumbnail: "/product_wallpaper1.png",
    category: dummyCategories[0], categoryId: "c1",
    tags: ["wallpaper", "3d", "galaxy"], sku: "WP-004", stock: 70,
    rating: 4.7, reviewCount: 86, isOnSale: true,
    brand: "CosmicDecor", createdAt: "2025-02-20",
  },
  {
    id: "p11", name: "PVC Wooden Floor Tile", slug: "pvc-wooden-floor-tile",
    description: "Interlocking PVC floor tiles with realistic wood grain texture.",
    shortDescription: "Waterproof, anti-slip, click-fit PVC tiles.",
    price: 950, originalPrice: 1200, discountPercent: 21,
    images: ["/product_floor1.png"],
    thumbnail: "/product_floor1.png",
    category: dummyCategories[8], categoryId: "c9",
    tags: ["pvc", "floor", "tile"], sku: "PF-001", stock: 110,
    rating: 4.5, reviewCount: 67, isHot: true,
    brand: "TilePro", createdAt: "2025-01-15",
  },
  {
    id: "p12", name: "UV Printed Brick Wall Sticker", slug: "uv-brick-wall-sticker",
    description: "Realistic brick-texture UV-printed peel-and-stick wall art.",
    shortDescription: "Peel-stick, reusable, UV-printed brick decal.",
    price: 990, originalPrice: 1300, discountPercent: 24,
    images: ["/product_wallpaper1.png"],
    thumbnail: "/product_wallpaper1.png",
    category: dummyCategories[7], categoryId: "c8",
    tags: ["uv", "brick", "sticker"], sku: "UV-001", stock: 55,
    rating: 4.4, reviewCount: 49,
    brand: "ArtWall", createdAt: "2025-02-28",
  },
];

/** Latest products */
export const latestProducts = dummyProducts.filter((p) => p.isNew);

/** Featured products */
export const featuredProducts = dummyProducts.filter((p) => p.isFeatured);

/** Best sellers */
export const bestSellers = dummyProducts.filter((p) => p.isBestSeller);

/** On sale products */
export const saleProducts = dummyProducts.filter((p) => p.isOnSale);

/** Hot products */
export const hotProducts = dummyProducts.filter((p) => p.isHot);
