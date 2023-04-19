import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout() {
    return (
        <main>
            <Header />
            <Outlet />
            <hr className='last-line' />
            <Footer />
        </main>
    );
}

export default Layout;
