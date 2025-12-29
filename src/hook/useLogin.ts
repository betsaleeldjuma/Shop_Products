import { useMutation } from "@tanstack/react-query"
import apiShop from "../store/apiShop"

interface LoginPayload {
  username: string
  password: string
}


const login = async (payload: LoginPayload) => {
  const res = await apiShop.post("/auth/login", payload)
  return res.data
}

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.accessToken)
      console.log('Token saved:', localStorage.getItem('token'))
    }
  })
}
