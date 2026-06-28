import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

interface CompareState {
  items: Product[];
  toggleCompare: (product: Product) => void;
  clearCompare: () => void;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      items: [],
      
      toggleCompare: (product) => {
        set((state) => {
          const isExisting = state.items.some((item) => item.id === product.id);
          
          if (isExisting) {
            // Remove from compare
            return { items: state.items.filter((item) => item.id !== product.id) };
          } else {
            // Add to compare (optional: limit max compare items to 4, but for now just add)
            return { items: [...state.items, product] };
          }
        });
      },

      clearCompare: () => set({ items: [] }),
    }),
    {
      name: 'compare-storage',
    }
  )
);
