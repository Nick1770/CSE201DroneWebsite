import { Outlet } from 'react-router-dom'
import { Nav } from '../nav/nav'

const Layout = () => {
    return (
        <main>
            <Nav/>
            <Outlet/>
        </main>
    )
}

export default Layout