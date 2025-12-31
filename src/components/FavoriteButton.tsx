import { FaHeart, FaRegHeart } from "react-icons/fa"
import { useFavorites } from "../hook/useFavorites"

interface Props {
  productId: number
}

const FavoriteButton = ({ productId }: Props) => {
  const toggleFavorite = useFavorites((s) => s.toggleFavorite)
  const isFavorite = useFavorites((s) => s.isFavorite(productId))

  return (
    <button
      onClick={() => toggleFavorite(productId)}
      className="p-2 rounded-full hover:bg-red-100 transition"
      aria-label="Add to favorites"
    >
      {isFavorite ? (
        <FaHeart className="text-red-500" size={18} />
      ) : (
        <FaRegHeart size={18} />
      )}
    </button>
  )
}

export default FavoriteButton
