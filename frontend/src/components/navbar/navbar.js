import { Link } from 'react-router-dom';
import './navbar.css';

function NavBar() {
    return (
        <nav>
            <Link to="/">home</Link>
            <Link to="/another-page">another page</Link>
        </nav>
    )
}

export default NavBar;