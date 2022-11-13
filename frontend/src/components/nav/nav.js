import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import "./nav.css"
import React, { useState, useEffect } from 'react';

export const Nav = () => {
    const { auth, logout, hasRole } = useAuth()
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        setTheme(localStorage.getItem('theme'))
    }, [])

    const toggleTheme = () => {
        if (theme === 'light') {
            localStorage.setItem('theme', 'dark')
            setTheme('dark');
        } else {
            localStorage.setItem('theme', 'light')
            setTheme('light');
        }
};
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/calendar">Calendar</Link>

            {hasRole('ADMIN') ? <Link to="/attendance">Attendance</Link> : ""}

            <span>    
                {
                    auth
                        ? <Link onClick={logout}>Logout</Link>
                        : <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                }
                <Link onClick={toggleTheme}>DarkMode</Link>
            </span>
        </nav>
    )
}