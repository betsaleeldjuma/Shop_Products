import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import apiShop from "../api/apiShop"
import EditProduct from "./EditProduct"
import { useState } from "react"

interface Product {
    id: number
    title: string
    category: string
    price: number
    rating: number
    description: string
}

const fetchProduct = async (id: number): Promise<Product> => {
    const res = await apiShop(`/products/${id}`)

    return res.data
}

const Description = () => {
    const {id} = useParams<{id:string}>()
    const [isEdit, setIsEdit] = useState(false)
    const productId = id ? Number(id) : undefined
    const {data, isError, isLoading} = useQuery<Product>({queryKey: ['products', id], queryFn: () => fetchProduct(productId!), enabled: !!id})

    if(isLoading) return <div><h1>Loading...</h1></div>
    if(isError) return <div><p>An Error Occured</p></div>
    if(!data) return <div><h1>No Products Found</h1></div>

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-[100%] h-screen">
      <div className="flex flex-col w-[40%] justify-center items-center">
        <h1 className="font-extrabold text-3xl">{data.title}</h1>
        <p className="text-xl font-bold">Price: ${data.price}</p>
        <p className="text-xl font-bold">Category: {data.category}</p>
        <h2 className="text-2xl font-bold">Description</h2>
        <p>{data.description}</p>
      </div>
      <div className="w-[35%]">
        {isEdit ? <div className="flex flex-col justify-center items-center gap-4">
          <EditProduct />
          <button onClick={() => setIsEdit(!isEdit)} className="bg-red-500 w-[80%] p-2 rounded-lg shadow-sm">Close</button>
        </div> : <div className="flex justify-center items-center">
            <button onClick={() => setIsEdit(!isEdit)} className="w-[80%] bg-yellow-500 p-2 rounded-lg shadow-sm">Edit</button>
          </div>} 
      </div>
    </div>
  )
}

export default Description