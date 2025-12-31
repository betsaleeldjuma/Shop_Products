import { useQuery } from "@tanstack/react-query"
import apiShop from "../store/apiShop"
import { useFavorites } from "../hook/useFavorites" 

interface Product {
  id: number
  title: string
  price: number
}

const fetchProducts = async (): Promise<Product[]> => {
  const res = await apiShop.get("/products")
  return res.data.products
}

const Favoris = () => {
  const favorites = useFavorites((s) => s.favorites)

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  })

  if (!products) return null

  const favoriteProducts = products.filter((p) =>
    favorites.includes(p.id)
  )

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <h2 className="text-2xl font-extrabold">Favoris</h2>

      {favoriteProducts.length === 0 ? (
        <p className="text-[#B4A5A5] font-bold">      
            No favorites
        </p>
      ) : (
        <ul className="space-y-2">
          {favoriteProducts.map((product) => (
            <li key={product.id}>
              {product.title} – ${product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Favoris
