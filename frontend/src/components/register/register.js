import { useState } from "react"

const Register = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email + ', ' + password)
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