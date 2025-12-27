import { useCartStore } from "../store/cartStore"

const Sidebar = () => {
    const {items, removeFromCart} = useCartStore()
    const total = items.reduce((acc, item) => acc + item.price, 0)

  return (
    <aside>
        <h2>Panier</h2>
        {items.length === 0 && <p>Empty</p>}
        <ul>
            {items.map((item) => (
                <li key={item.id}>
                    {item.title} - ${item.price}{" "}
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </li>
            ))}
        </ul>
        <h3>Total: ${total}</h3>
    </aside>
  )
}

export default Sidebar