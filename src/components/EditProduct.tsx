import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import apiShop from "../store/apiShop"
import { useState } from "react"
import { useDeleteProduct } from "../hook/useDeleteProduct"

interface ProductUpdate {
  title: string
  price: number
}

interface ProductResponse {
  id: number
  title: string
  price: number
  description?: string
  category?: string
}

const EditProduct = () => {
    const {id} = useParams<{id: string}>()
    const productId = Number(id)
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {data: product, isLoading} = useQuery({
        queryKey: ["product", productId],
        queryFn: () => apiShop.get(`/products/${productId}`).then(res => res.data),
        enabled: !!productId
    })

    const [title, setTitle] = useState(product?.title ?? "")
    const [price, setPrice] = useState(product?.price ?? "")

    const mutation = useMutation<ProductResponse, Error, ProductUpdate>({
        mutationFn: (updatedData) => apiShop.put(`/products/${productId}`, updatedData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["products"]})
            queryClient.invalidateQueries({queryKey: ["product", productId]})
            navigate("/app")
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutation.mutate({title, price})
    }

    const deleteMutation = useDeleteProduct(productId)

    const handleDelete = () => {
        if(window.confirm('Voulez-vous vraiment supprimer ce produit ?')) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    alert("Product deleted")
                    navigate("/app")
                }
            })
        }
    }

    if(isLoading) return <p>Loading...</p>

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4 w-[40%]">
        <input type="text" defaultValue={product?.title} onChange={(e) => setTitle(e.target.value)} placeholder="Change The Title"/>
        <input type="number" defaultValue={product?.price} onChange={(e) => setPrice(Number(e.target.value))} placeholder="Change The Price"/>
        <button type="submit" className="w-[80%] bg-[#3C415C] p-2 rounded-lg text-white">Save</button>
        <button type="button" onClick={handleDelete} className="bg-red-500 w-[80%] p-2 rounded-lg text-white">Delete</button>
    </form>
  )
}

export default EditProduct