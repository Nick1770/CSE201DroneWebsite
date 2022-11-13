import { Outlet } from 'react-router-dom'
import { Nav } from '../nav/nav'

const Layout = () => {
    return (
        <main>
            <Nav/>
            <div className='wrapper'>
                <Outlet/>
            </div>
        </main>
    )
}

export default Layout