import React, { useEffect, useState } from "react"

const apiURL = process.env.REACT_APP_API_URL
export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        setUser(localStorage.getItem('user'))
    }, [])

    function login(email, password) {
        return fetch(`${apiURL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        }).then(res => {
            if (res.status === 200)
                res.json().then(json => {
                    localStorage.setItem('user', JSON.stringify({
                        id: json.id,
                        roles: json.roles
                    }))
                    setUser({
                        id: json.id,
                        roles: json.roles
                    })
                })
            else {
                localStorage.removeItem('user')
                setUser(null)
            }
            return res
        })
    }

    function logout() {
        return fetch(`${apiURL}/auth/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        }).then(res => {
            if (res.status === 200) {
                localStorage.removeItem('user')
                setUser(null)
            }
            return res
        })
    }

    function isLoggedIn() {
        return localStorage.getItem('user') !== null ? true : false
    }

    function getUser() {
        return localStorage.getItem('user')
    }

    return (
        <AuthContext.Provider value={{
            login, logout, isLoggedIn, getUser
        }}>
            { children }
        </AuthContext.Provider>
    )
}