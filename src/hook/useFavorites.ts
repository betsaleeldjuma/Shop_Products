import { create } from "zustand"
import { persist } from "zustand/middleware"

interface FavoriteStore {
  favorites: number[]
  toggleFavorite: (id: number) => void
  removeFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
}

export const useFavorites = create(
  persist<FavoriteStore>(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((f) => f !== id)
            : [...state.favorites, id],
        })),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f !== id),
        })),

      isFavorite: (id) => get().favorites.includes(id),
    }),
    {
      name: "favorites-storage",
    }
  )
)
