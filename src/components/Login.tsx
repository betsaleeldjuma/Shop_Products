import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLogin } from "../hook/useLogin"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const loginMutation = useLogin()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        loginMutation.mutate(
        {username, password},
        {onSuccess: () => navigate('/app')}
        )
    }
    
  return (
    <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Login</button>
    </form>
  )
}

export default Login