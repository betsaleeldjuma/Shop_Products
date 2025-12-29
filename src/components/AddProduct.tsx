
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import apiShop from "../store/apiShop"

const AddProductForm = () => {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState(0)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data: { title: string; price: number }) =>
      apiShop.post("/products/add", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      navigate("/app")
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({ title, price })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col justify-center items-center gap-4 w-full h-screen shadow-lg">
        <label className="text-xl font-bold">Product Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Product title" className="border rounded-lg p-1"/>
        <label className="text-xl font-bold">Product Price</label>
        <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} placeholder="Price" className="border rounded-lg p-1"/>
        <button type="submit" className="bg-green-500 w-[30%] rounded-lg shadow-sm">Create product</button>
      </div>
    </form>
  )
}

export default AddProductForm
