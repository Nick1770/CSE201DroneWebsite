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
                else
                    alert('incorrect login credentials')
            })
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email: </label>
                <input type="email" id="email" value={email} placeholder="example@gmail.com"
                    required onChange={e => setEmail(e.target.value)}/>

                <label htmlFor="password">Password: </label>
                <input type="password" id="password" value={password} required
                    onChange={e => setPassword(e.target.value)}/>

                <input type="submit" value="Login"/>
            </form>
        </>
    )
}

export default Login