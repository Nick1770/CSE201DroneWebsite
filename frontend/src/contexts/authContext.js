import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null)
    const authLocalStorage = 'auth'

    useEffect(() => {
        setAuth(JSON.parse(localStorage.getItem(authLocalStorage)))
    }, [])

    const login = async (email, password) => {
        const newAuth = {
            id: 0,
            email,
            roles: ['ADMIN']
        }
        localStorage.setItem(authLocalStorage, JSON.stringify(newAuth))
        setAuth(newAuth)
        console.log(`logged in as ${email}`)
    }

    const logout = async () => {
        console.log("logging out")
        setAuth(null)
        localStorage.removeItem(authLocalStorage)
    }

    const hasRole = (role) => {
        return auth?.roles?.includes(role)
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, login, logout, hasRole }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider