import { createContext, useEffect, useState } from 'react'
import callAPI from '../api/fetch'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null)
    const authLocalStorage = 'auth'

    useEffect(() => {
        setAuth(JSON.parse(localStorage.getItem(authLocalStorage)))
    }, [])

    const login = async (email, password) => {
        const res = await callAPI('/auth/login', 'POST', {
            email, password
        })
        
        if (res.status === 200) {
            const json = await res.json()
            const newAuth = {
                id: json.id,
                email,
                roles: json.roles
            }
            localStorage.setItem(authLocalStorage, JSON.stringify(newAuth))
            setAuth(newAuth)
            console.log(`logged in as ${email}`)
            console.log(newAuth)
        }

        return res
    }

    const register = async (email, password) => {
        const res = await callAPI('/auth/register', 'POST', {
            email, password
        })
        
        if (res.status === 201) {
            const json = await res.json()
            console.log(json)
            const newAuth = {
                id: json.id,
                email,
                roles: json.roles
            }
            localStorage.setItem(authLocalStorage, JSON.stringify(newAuth))
            setAuth(newAuth)
            console.log(`logged in as ${email}`)
            console.log(newAuth)
        }
        
        return res
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
        <AuthContext.Provider value={{ auth, setAuth, login, logout, hasRole, register }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider