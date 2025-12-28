import { useCartStore } from "../store/cartStore"

const Sidebar = () => {
    const {items, removeFromCart} = useCartStore()
    const total = items.reduce((acc, item) => acc + item.price, 0)

  return (
    <aside>
        <h2 className="text-3xl font-bold">Basket</h2>
        {items.length === 0 && <p>Empty</p>}
        <ul>
            {items.map((item, index) => (
                <li key={item.id || index}>
                    <h1><span className="font-bold">{item.title}</span> - ${item.price}{" "}</h1>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-600">Remove</button>
                </li>
            ))}
        </ul>
        <h3 className="text-xl font-bold">Total: ${total}</h3>
    </aside>
  )
}

export default Sidebar