import { Navigate, Route, Routes } from "react-router-dom"
import Form from "./components/Form"
import AppShop from "./components/AppShop"
import Description from "./components/Description"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Form />} />
      <Route path="/app" element={<AppShop />} />
      <Route path="/products/:id" element={<Description />} />
    </Routes>
  )
}

export default App