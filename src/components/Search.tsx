import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import apiShop from "../api/apiShop"

const searchProducts = async (query: string) => {
    const res = await apiShop.get('/products/search', {
        params: {q: query}
    })

    return res.data
}

const Search = () => {
    const [search,setSearch] = useState('')

    const {data, isLoading, isError} = useQuery({
        queryKey: ['search-products', search],
        queryFn: () => searchProducts(search),
        enabled: !!search
    })

    if(isLoading) return <div><h1>Loading...</h1></div>
    if(isError) return <div><p>An Error Occured</p></div>
    if(!data) return <div><h1>No Products Found</h1></div>

  return (
    <div>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..."/>
    </div>
  )
}

export default Search