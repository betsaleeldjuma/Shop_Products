import { Navigate, Route, Routes } from "react-router-dom"
import AppShop from "./components/AppShop"
import Description from "./components/Description"
import Login from "./components/Login"
import AddProductForm from "./components/AddProduct"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/app" element={<AppShop />} />
      <Route path="/products/:id" element={<Description />} />
      <Route path="/products/new" element={<AddProductForm />} />
    </Routes>
  )
}

export default App