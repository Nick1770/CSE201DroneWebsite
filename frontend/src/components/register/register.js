import { useState } from "react"
import { useNavigate } from "react-router-dom"
import callAPI from "../../api/fetch"
import useAuth from "../../hooks/useAuth"

const Register = () => {
    const { register } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(email + ', ' + password)
        const res = await register(email, password)
        if (res.status === 201)
            navigate('/')
    }

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input type="text" id="email" value={email} autoComplete="false"
                    onChange={e => setEmail(e.target.value)}/>

                <label htmlFor="password">password</label>
                <input type="password" id="password" value={password}
                    onChange={e => setPassword(e.target.value)}/>

                <input type="submit" value="Login"/>
            </form>
        </>
    )
}

export default Register