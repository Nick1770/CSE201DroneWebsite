import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import './navbar.css';

function NavBar() {
    const { isLoggedIn, logout } = useContext(AuthContext)

    return (
        <nav>
            <Link to="/">home</Link>
            <Link to="/another-page">another page</Link>
            {!isLoggedIn() ? <Link to="/login">login</Link> : <button onClick={logout}>logout</button>}
        </nav>
    )
}

export default NavBar;