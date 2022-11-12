import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/authContext"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { isLoggedIn, login } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn())
            navigate('/')
    }, [])

    function loginClick() {
        login(email, password)
            .then(res => {
                if (res.status === 401)
                    alert("failed to login")
                else
                    navigate('/')
            })
    }

    return (
        <>
            <label>email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
            <br/>
            <label>password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            <br/>
            <button onClick={loginClick}>Login</button>
        </>
    )
}