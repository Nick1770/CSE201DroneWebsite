import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const Login = () => {
    const { login } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email + ', ' + password)
        login(email, password)
            .then(res => {
                if (res.status === 200)
                    navigate('/')
            })
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input type="text" id="email" value={email}
                    onChange={e => setEmail(e.target.value)}/>

                <label htmlFor="password">password</label>
                <input type="password" id="password" value={password}
                    onChange={e => setPassword(e.target.value)}/>

                <input type="submit" value="Login"/>
            </form>
        </>
    )
}

export default Login