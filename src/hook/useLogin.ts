import apiShop from "../store/apiShop"
import { useMutation } from "@tanstack/react-query"

interface LoginPayload {
    username: string
    password: string
}

interface LoginResponse {
    id: number
    username: string
    email: string
    token: string
}

export const useLogin = () => {
    return useMutation<LoginResponse, Error, LoginPayload>({
        mutationFn: ({username, password}) => apiShop.post<LoginResponse>("https://dummyjson.com/auth/login", {username, password}).then(res => res.data),
        onSuccess: (data) => {
            localStorage.setItem('token', data.token)
            console.log('Login successful, token saved')
        }
    })
}