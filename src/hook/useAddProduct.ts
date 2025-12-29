import { useMutation, useQueryClient } from "@tanstack/react-query"
import apiShop from "../store/apiShop"

interface ProductInput {
  title: string
  price: number
  description?: string
  category?: string
  thumbnail?: string
}

interface ProductResponse extends ProductInput {
  id: number
}

export const useAddProduct = () => {
    const queryClient = useQueryClient()

    return useMutation<ProductResponse, Error, ProductInput>({
        mutationFn: (newProduct) => apiShop.post("/products/add", newProduct).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["products"]})
        }
    })
}