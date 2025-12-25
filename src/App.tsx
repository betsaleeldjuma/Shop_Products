import { Navigate, Route, Routes } from "react-router-dom"
import Form from "./components/Form"
import AppShop from "./components/AppShop"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Form />} />
      <Route path="/app" element={<AppShop />} />
      {/* <Route path="/" element={} /> */}
    </Routes>
  )
}

export default App