import { useQuery, type QueryFunctionContext } from "@tanstack/react-query"
import apiShop from "../api/apiShop"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useCartStore } from "../store/cartStore"
import Sidebar from "./Sidebar"
import { CgAdd } from "react-icons/cg"
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
    <div className="flex p-5">
        <div className="w-[30%] p-5">
            {isOpen ? <div>
                <Sidebar />
                <button onClick={() => setIsOpen(!isOpen)} className="w-[80%] bg-red-500 rounded-lg">Close</button>
            </div> : <div className="flex flex-col justify-center gap-2">
                    <h1 className="text-3xl font-bold">Basket</h1>
                    <button onClick={() => setIsOpen(!isOpen)} className="w-[80%] bg-green-500 rounded-lg">Open</button>
                </div>}
        </div>
        <div className="w-[70%] p-5">
            <div className="flex justify-between items-center p-2">
                <h1 className="text-3xl font-bold">Shop</h1>
                <Link to='/products/new'><CgAdd size={25}/></Link>
            </div>
            <div className="flex flex-col gap-4">
                <div>
                    <ul className="flex flex-col gap-8">
                        {data.products.map((product) => (
                            <li key={product.id} className="flex flex-col gap-2 shadow-lg p-3">
                                <div className="flex justify-evenly">
                                    <h1>{product.title}</h1>
                                    <p>{product.category}</p>
                                    <p>Rating: {product.rating}</p>
                                    <p>Price: ${product.price}</p>
                                </div>
                                <div className="flex justify-center gap-4">
                                    <button onClick={() => addToCart(product)}>Add</button>
                                    <Link to={`/products/${product.id}`} className="underline text-blue-700 hover:text-black">View Description</Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    {isFetching && <p>Chargement...</p>}
                    <div className="flex gap-4">
                        <button onClick={() => setPage((p) => Math.max(p - 1, 0))} disabled={page === 0} className="bg-black text-white p-2 rounded-lg">Prev</button>
                        <button onClick={() => setPage((p) => p + 1)} disabled={!data?.products?.length} className="bg-black text-white p-2 rounded-lg">Next</button>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default AppShop