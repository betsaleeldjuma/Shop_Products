import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import apiShop from "../store/apiShop"

interface Product {
  id: number
  title: string
  price: number
}

interface SearchResponse {
  products: Product[]
}

const searchProducts = async (
  query: string
): Promise<SearchResponse> => {
  const res = await apiShop.get<SearchResponse>("/products/search", {
    params: { q: query },
  })

  return res.data
}

const Search = () => {
  const [search, setSearch] = useState("")

  const {
    data,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<SearchResponse>({
    queryKey: ["search-products", search],
    queryFn: () => searchProducts(search),
    enabled: search.trim().length > 1,
  })

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />

      {isLoading && <p>Loading...</p>}

      {isError && <p>An error occurred</p>}

      {isSuccess && data.products.length === 0 && (
        <p>No products found</p>
      )}

      {isSuccess && data.products.length > 0 && (
        <ul>
          {data.products.map((product) => (
            <li key={product.id}>
              {product.title} – ${product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Search
