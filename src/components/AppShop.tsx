import { useQuery, type QueryFunctionContext } from "@tanstack/react-query"
// import { useParams } from "react-router-dom"
import apiShop from "../api/apiShop"
import { Link } from "react-router-dom"
import { useState } from "react"

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
    const LIMIT = 10
    const [page, setPage] = useState(0)
    const skip = page * LIMIT
    const {data , error, isLoading, isFetching} = useQuery({queryKey: ['products', {limit: LIMIT, skip}], queryFn: fetchUser, placeholderData: (previousData) => previousData})

    if(isLoading) return <div><h1>Loading...</h1></div>
    if(error) return <div><p>An Error Occured</p></div>
    if(!data) return <div><h1>No Products Found</h1></div>

  return (
    <div>
        <div>
            <ul>
                {data.products.map((product) => (
                    <li key={product.id}>
                        <h1>{product.title}</h1>
                        <p>{product.category}</p>
                        <p>Rating: {product.rating}</p>
                        <p>Price: ${product.price}</p>
                        <Link to={`/products/${product.id}`}>View Description</Link>
                    </li>
                ))}
            </ul>
        </div>
        <div>
            {isFetching && <p>Chargement...</p>}
            <button onClick={() => setPage((p) => Math.max(p - 1, 0))} disabled={page === 0}>Page précédente</button>
            <button onClick={() => setPage((p) => p + 1)} disabled={!data?.products?.length}>Page suivante</button>
        </div>
    </div>
  )
}

export default AppShop