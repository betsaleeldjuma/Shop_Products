import axios from "axios";

const apiShop = axios.create({
    baseURL: "ttps://dummyjson.com",
    headers: {"Content-Type": "application/json"}
})

apiShop.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

apiShop.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401) {
            console.log("Token invalide")
        }

        return Promise.reject(error)
    }
)

export default apiShop