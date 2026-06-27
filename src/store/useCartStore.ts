import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      
      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          let newItems;
          
          if (existingItem) {
            newItems = state.items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            const newItem: CartItem = {
              id: product.id,
              product: {
                id: product.id,
                name: product.name,
                thumbnail: product.thumbnail,
                price: product.price,
                slug: product.slug,
              },
              quantity,
              price: product.price,
            };
            newItems = [...state.items, newItem];
          }

          const totalItems = newItems.reduce((total, item) => total + item.quantity, 0);
          const totalPrice = newItems.reduce((total, item) => total + (item.price * item.quantity), 0);

          return { items: newItems, totalItems, totalPrice };
        });
      },

      removeFromCart: (productId) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== productId);
          const totalItems = newItems.reduce((total, item) => total + item.quantity, 0);
          const totalPrice = newItems.reduce((total, item) => total + (item.price * item.quantity), 0);
          
          return { items: newItems, totalItems, totalPrice };
        });
      },

      updateQuantity: (productId, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return state; // Use removeFromCart to remove
          }
          
          const newItems = state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          );
          
          const totalItems = newItems.reduce((total, item) => total + item.quantity, 0);
          const totalPrice = newItems.reduce((total, item) => total + (item.price * item.quantity), 0);
          
          return { items: newItems, totalItems, totalPrice };
        });
      },

      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
