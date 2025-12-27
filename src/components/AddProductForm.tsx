import { useState } from "react"
import { useAddProduct } from "../hook/useAddProduct"

const AddProductForm = () => {
  const addProduct = useAddProduct()
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addProduct.mutate({title, price})
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add The Title"/>
      <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder="Add The Price"/>
      <button type="submit">Add</button>

      {addProduct.isSuccess && <p>Success</p>}
    </form>
  )
}

export default AddProductForm