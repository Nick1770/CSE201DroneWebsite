import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const Register = () => {
    const { register } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(email + ', ' + password)
        const res = await register(email, fName, lName, password)
        if (res.status === 201)
            navigate('/')
        else if (res.status === 400)
            alert('bad request')
        else
            alert('an error occurred')
    }

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fName">first name</label>
                <input type="text" id="fName" value={fName} autoComplete="false"
                    onChange={e => setFName(e.target.value)}/>
                <br/>

                <label htmlFor="lName">last name</label>
                <input type="text" id="lName" value={lName} autoComplete="false"
                    onChange={e => setLName(e.target.value)}/>
                <br/>

                <label htmlFor="email">email</label>
                <input type="email" id="email" value={email} autoComplete="false"
                    onChange={e => setEmail(e.target.value)}/>
                <br/>

                <label htmlFor="password">password</label>
                <input type="password" id="password" value={password}
                    onChange={e => setPassword(e.target.value)}/>
                <br/>

                <input type="submit" value="Register"/>
            </form>
        </>
    )
}

export default Register