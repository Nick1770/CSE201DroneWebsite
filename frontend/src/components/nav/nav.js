import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import "./nav.css"

export const Nav = () => {
    const { auth, logout, hasRole } = useAuth()

    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/calendar">Calendar</Link>
            <Link to="/imageGallery">Image Gallery</Link>

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
            </div>
        </nav>
    )
}