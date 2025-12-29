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
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4 w-screen h-screen text-[#B4A5A5]">
      <div className="flex flex-col justify-center items-center gap-4 w-[80%] h-[60%] bg-[#301B3F] rounded-lg shadow-lg">
        <label className="text-xl font-bold">Name:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 w-[40%] rounded-sm"/>
        <label className="text-xl font-bold">Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-[40%] rounded-sm"/>
        <button type="submit" className="bg-[#3C415C] p-2 rounded-lg shadow-lg w-[40%] text-white">Login</button>
      </div>
        
    </form>
  )
}

export default Login