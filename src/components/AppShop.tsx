import { useQuery, type QueryFunctionContext } from "@tanstack/react-query"
import apiShop from "../api/apiShop"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useCartStore } from "../store/cartStore"
import Sidebar from "./Sidebar"
// import Search from "./Search"

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
    const [isOpen, setIsOpen] = useState(false)
    const skip = page * LIMIT
    const {data , error, isLoading, isFetching} = useQuery({queryKey: ['products', {limit: LIMIT, skip}], queryFn: fetchUser, placeholderData: (previousData) => previousData})
    const addToCart = useCartStore((state) => state.addToCart)

    if(isLoading) return <div><h1>Loading...</h1></div>
    if(error) return <div><p>An Error Occured</p></div>
    if(!data) return <div><h1>No Products Found</h1></div>

  return (
    <div className="flex ">
        <div>
            {isOpen ? <div>
                <Sidebar />
                <button onClick={() => setIsOpen(!isOpen)}>Close</button>
            </div> : <button onClick={() => setIsOpen(!isOpen)}>Store</button>}
        </div>
        <div>
            <div>
                <h1>Shop</h1>
                {/* <Search /> */}
            </div>
            <div>
                <div>
                    <ul>
                        {data.products.map((product) => (
                            <li key={product.id}>
                                <h1>{product.title}</h1>
                                <p>{product.category}</p>
                                <p>Rating: {product.rating}</p>
                                <p>Price: ${product.price}</p>
                                <button onClick={() => addToCart(product)}>Add</button>
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
        </div>
        
    </div>
  )
}

export default AppShop