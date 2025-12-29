import { useMutation, useQueryClient } from "@tanstack/react-query"
import apiShop from "../store/apiShop"

export const useDeleteProduct = (productId: number) => {
    const queryClient = useQueryClient()

    return useMutation<void, Error, void>({
        mutationFn: () => apiShop.delete(`/products/${productId}`).then(() => {}),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["products"]})
        }}
    )
}