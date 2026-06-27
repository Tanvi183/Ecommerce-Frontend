import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

interface WishlistState {
  items: Product[];
  toggleWishlist: (product: Product) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      toggleWishlist: (product) => {
        set((state) => {
          const isExisting = state.items.some((item) => item.id === product.id);
          
          if (isExisting) {
            // Remove from wishlist
            return { items: state.items.filter((item) => item.id !== product.id) };
          } else {
            // Add to wishlist
            return { items: [...state.items, product] };
          }
        });
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
