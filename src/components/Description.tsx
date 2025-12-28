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
    <div>
        <h1>{data.title}</h1>
        <p>Price: ${data.price}</p>
        <p>Category: {data.category}</p>
        <h2>Description</h2>
        <p>{data.description}</p>
        {isEdit ? <div>
          <EditProduct />
        </div> : <div>
            <button onClick={() => setIsEdit(!isEdit)}>Edit</button>
          </div>} 
    </div>
  )
}

export default Description