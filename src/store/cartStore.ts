import { create } from "zustand";

interface Product {
    id: number
    title: string
    price: number
}

interface CartState {
    items: Product[]
    addToCart: (product: Product) => void
    removeFromCart: (productId: number) => void
}

export const useCartStore = create<CartState>((set) => ({
    items: [],
    addToCart: (product) => set((state) => ({
        items: [...state.items, product]
    })),
    removeFromCart: (productId) => set((state) => ({
        items: state.items.filter((item) => item.id !== productId)
    }))
}))