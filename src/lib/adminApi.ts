import api from './api';

// Stats
export const getAdminStats = () => api.get('/admin/stats');

// Brands
export const getBrands = () => api.get('/brands');
export const createBrand = (data: any) => api.post('/brands', data);
export const updateBrand = (id: string, data: any) => api.put(`/brands/${id}`, data);
export const deleteBrand = (id: string) => api.delete(`/brands/${id}`);

// Categories
export const getCategories = () => api.get('/categories');
export const createCategory = (data: any) => api.post('/categories', data);
export const updateCategory = (id: string, data: any) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id: string) => api.delete(`/categories/${id}`);

// Others Feature
export const getFeatures = () => api.get('/features');
export const createFeature = (data: any) => api.post('/features', data);
export const updateFeature = (id: string, data: any) => api.put(`/features/${id}`, data);
export const deleteFeature = (id: string) => api.delete(`/features/${id}`);

// Appearance Settings
export const getSettings = () => api.get('/settings');
export const updateSettings = (data: any) => api.put('/settings', data);

// Products
export const getProductsAdmin = (params?: any) => api.get('/products', { params });
export const createProduct = (data: any) => api.post('/products', data);
export const updateProduct = (id: string, data: any) => api.put(`/products/${id}`, data);
export const deleteProduct = (id: string) => api.delete(`/products/${id}`);
export const updateProductStock = (id: string, data: { quantity: number, operation: string }) => api.patch(`/products/${id}/stock`, data);

// Low Stock
export const getLowStockProducts = () => api.get('/admin/low-stock');

// Orders
export const getOrdersAdmin = (params?: any) => api.get('/orders', { params });
export const updateOrderStatus = (id: string, data: { status?: string, paymentStatus?: string }) => api.put(`/orders/${id}/status`, data);

// Customers
export const getCustomersAdmin = (params?: any) => api.get('/admin/customers', { params });

// Reviews
// Since we don't have a single GET /api/reviews for admin, we'll need a way to fetch all reviews.
// Oh wait, the backend plan didn't add a GET /api/reviews route to list ALL reviews for admin.
// For now, we can skip the global review list or just fetch reviews per product.
// Wait, I can quickly add a `getAllReviews` to the backend admin controller, or just skip global reviews.
// Let's implement deleteReview here.
export const deleteReview = (id: string) => api.delete(`/reviews/${id}`);
