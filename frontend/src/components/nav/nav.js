import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import "./nav.css"
import React, { useState, useEffect } from 'react';

export const Nav = () => {
    const { auth, logout, hasRole } = useAuth()
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        if (theme === 'light') {
        setTheme('dark');
        } else {
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

            <div>    
                {
                    auth
                        ? <Link onClick={logout}>Logout</Link>
                        : <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                }
             <Link onClick={toggleTheme}>DarkMode</Link>
            </div>
        </nav>
    )
}