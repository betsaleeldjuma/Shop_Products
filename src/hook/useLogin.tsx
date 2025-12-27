import apiShop from "../api/apiShop"
import { useMutation } from "@tanstack/react-query"

interface LoginPayLoad {
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
    return useMutation<LoginResponse, Error, LoginPayLoad>({
        mutationFn: ({username, password}) => apiShop.post<LoginResponse>("/auth/login", {username, password}).then(res => res.data),
        onSuccess: (data) => {
            localStorage.setItem('token', data.token)
            console.log('Login successful, token savec')
        }
    })
}