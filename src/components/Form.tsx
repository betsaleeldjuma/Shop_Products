import { useState } from "react"
import AppShop from "./AppShop"
import { Link } from "react-router-dom"

const Form = () => {
    const [name, setName] = useState<string>('')
    const [errorName, setErrorName] = useState<string>('')
    const [postName, setPostName] = useState<string>('')
    const [errorPostName, setErrorPostName] = useState<string>('')
    const [password, setPassword] = useState<string>("")
    const [errorPassword, setErrorPassword] = useState<string>('')
    const [isSubmit, setIsSubmit] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let hasError = false

        setErrorName('')
        setErrorPostName('')
        setErrorPassword('')

        if(!name) {
            setErrorName('Complete The Name')
            hasError = true
        }

        if(!postName) {
            setErrorPostName("Complete The Post-Name")
            hasError = true
        }

        if (!password) {
            setErrorPassword("Password is required")
            hasError = true
        } else if (password.length < 8) {
            setErrorPassword("Password must be at least 8 characters")
            hasError = true
        }

        if(hasError) return

        setIsSubmit(true)
    }

    if(isSubmit) {
        return <AppShop />
    }

  return (
    <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        <p>{errorName}</p>
        <label>Post-Name:</label>
        <input type="text" value={postName} onChange={(e) => setPostName(e.target.value)}/>
        <p>{errorPostName}</p>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <p>{errorPassword}</p>
        <Link to="/app" type="submit">Login</Link>
    </form>
  )
}

export default Form