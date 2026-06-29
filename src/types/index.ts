// ─── Product ───────────────────────────────────────────────────
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  images: string[];
  thumbnail: string;
  category: Category;
  categoryId: string;
  tags: string[];
  sku: string;
  stock: number;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isHot?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isOnSale?: boolean;
  brand?: string;
  createdAt: string;
}

// ─── Category ──────────────────────────────────────────────────
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  productCount?: number;
  parentId?: string;
  children?: Category[];
}

// ─── Review ────────────────────────────────────────────────────
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  body: string;
  createdAt: string;
  isVerified: boolean;
}

// ─── User / Auth ───────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: "CUSTOMER" | "ADMIN";
  address?: Address;
  createdAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

// ─── Cart ──────────────────────────────────────────────────────
export interface CartItem {
  id: string;
  product: Pick<Product, "id" | "name" | "thumbnail" | "price" | "slug">;
  quantity: number;
  price: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// ─── Order ─────────────────────────────────────────────────────
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  shippingAddress: Address;
  paymentMethod: string;
  paymentStatus: "unpaid" | "paid" | "refunded";
  createdAt: string;
}

// ─── Brand ─────────────────────────────────────────────────────
export interface Brand {
  id: string;
  name: string;
  logo: string;
  href?: string;
}

// ─── API ───────────────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── Filters ───────────────────────────────────────────────────
export interface ProductFilters {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sort?: "price-asc" | "price-desc" | "newest" | "popular";
  page?: number;
  limit?: number;
}
