import { useQuery, type QueryFunctionContext } from "@tanstack/react-query"
import apiShop from "../store/apiShop"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useCartStore } from "../store/cartStore"
import Sidebar from "./Sidebar"
import { CgAdd } from "react-icons/cg"
import Search from "./Search"
import { motion } from "framer-motion"
import { FaSearch } from "react-icons/fa"
import { IoBagHandle } from "react-icons/io5"

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
    const [search, setSearch] = useState(false)
    const [basket, setBasket] = useState(false)
    const skip = page * LIMIT
    const {data , error, isLoading, isFetching} = useQuery({queryKey: ['products', {limit: LIMIT, skip}], queryFn: fetchUser, placeholderData: (previousData) => previousData})
    const addToCart = useCartStore((state) => state.addToCart)

    if(isLoading) return <div className="flex justify-center items-center bg-[#301B3F] rounded-full"><h1>Loading...</h1></div>
    if(error) return <div><p>An Error Occured</p></div>
    if(!data) return <div><h1>No Products Found</h1></div>

  return (
    <div className="flex justify-center w-screen lg:p-5 text-[#B4A5A5]">
        {/* SIDEBAR */}
        <div className="w-[30%] p-5 hidden lg:block">
            {isOpen ? <div className="shadow-lg p-5">
                <Sidebar />
                <button onClick={() => setIsOpen(!isOpen)} className="w-[80%] bg-red-500 rounded-lg text-white">Close</button>
            </div> : <div className="flex flex-col justify-center gap-2">
                    <h1 className="text-3xl font-bold">Basket</h1>
                    <button onClick={() => setIsOpen(!isOpen)} className="w-[80%] bg-[#3C415C] rounded-lg">Open</button>
                </div>}
        </div>
        <div className="w-[70%] ">
            {/* HEADER */}
            <div className="flex justify-between items-center p-2">
                <h1 className="text-3xl font-bold">Shop</h1>
                <div className="flex flex-row gap-2">
                    {basket ? <div className="fixed inset-0 z-50">
                        <div className="absolute inset-0 bg-black/50 z-5 backdrop-blur-sm">
                            <div className="flex flex-col justify-center items-center gap-4 h-full">
                                <Sidebar />
                                <button onClick={() => setBasket(!basket)} className="w-[80%] bg-red-500 rounded-lg text-white">Close</button>
                            </div>
                        </div>
                    </div> : <div>
                            <button onClick={() => setBasket(!basket)}><IoBagHandle size={25}/></button>
                        </div>}
                    {search ? 
                    <div>
                        <div className="absolute right-5 top-12 bg-[#3C415C] p-3 rounded-lg shadow-lg">
                            <Search />
                        </div>
                        <button onClick={() => setSearch(!search)}><FaSearch size={25}/></button>
                    </div> 
                    : <button onClick={() => setSearch(!search)}><FaSearch size={20}/></button>}
                    <Link to='/products/new'><CgAdd size={25}/></Link>
                </div>
            </div>
            {/* BODY */}
            <div className="flex flex-col gap-8">
                <div>
                    <ul className="flex flex-col gap-8  rounded-lg">
                        {data.products.map((product) => (
                            <motion.li key={product.id} className="flex flex-col gap-2 bg-[#301B3F] w-[100%] rounded-lg shadow-lg p-3" initial={{y: 100, opacity: 0.7, scale: 0.7}} whileInView={{y: 0, scale: 1, opacity: 1}} whileHover={{scale: 1.1, opacity: 0.9}}>
                                <div className="flex flex-col gap-2 lg:flex-row lg:justify-evenly">
                                    <h1>{product.title}</h1>
                                    <p>{product.category}</p>
                                    <p>Rating: {product.rating}</p>
                                    <p>Price: ${product.price}</p>
                                </div>
                                <div className="flex justify-center items-center gap-4">
                                    <motion.button onClick={() => addToCart(product)} className="bg-[#3C415C] p-2 rounded-lg shadow-sm">Add</motion.button>
                                    <Link to={`/products/${product.id}`} className="underline text-blue-700 hover:text-[#B4A5A5]">View Description</Link>
                                </div>
                            </motion.li>
                        ))}
                    </ul>
                </div>
                <div>
                    {isFetching && <p>Chargement...</p>}
                    <div className="flex gap-4">
                        <button onClick={() => setPage((p) => Math.max(p - 1, 0))} disabled={page === 0} className="bg-[#3C415C] text-white p-2 rounded-lg">Prev</button>
                        <button onClick={() => setPage((p) => p + 1)} disabled={!data?.products?.length} className="bg-[#3C415C] text-white p-2 rounded-lg">Next</button>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default AppShop