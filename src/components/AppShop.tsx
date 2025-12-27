import { useQuery, type QueryFunctionContext } from "@tanstack/react-query"
// import { useParams } from "react-router-dom"
import apiShop from "../api/apiShop"

interface Product {
    id: number,
    title: string,
    category: string,
    price: number,
    rating: number
}

interface ProductsResponse {
    products: Product[]
    total: number
    skip: number
    limit: number
}

const fetchUser = async ({queryKey}: QueryFunctionContext): Promise<ProductsResponse> => {
    const [, params] = queryKey as [string, {limit: number; skip: number}]

    const response = await apiShop('/products', {
        params
    })

    return response.data
}

const AppShop = () => {
    const {data , error, isLoading} = useQuery({queryKey: ['products', {limit: 10, skip: 0}], queryFn: fetchUser})

    if(isLoading) return <div><h1>Loading...</h1></div>
    if(error) return <div><p>An Error Occured</p></div>
    if(!data) return <div><h1>No Products Found</h1></div>

  return (
    <ul>
        {data.products.map((product) => (
            <li key={product.id}>
                <h1>{product.title}</h1>
                <p>{product.category}</p>
                <p>Rating: {product.rating}</p>
                <p>Price: ${product.price}</p>
            </li>
        ))}
    </ul>
  )
}

export default AppShop