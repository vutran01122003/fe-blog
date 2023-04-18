import axios from 'axios';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import {
    faArrowRightFromBracket,
    faMagnifyingGlass,
    faPenToSquare
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Header() {
    let { userInfo, setUserInfo } = useContext(UserContext);
    const [searchValueForm, setSearchValueForm] = useState('');
    const { setSearchValue } = useContext(UserContext);

    const logoutUser = (e) => {
        e.preventDefault();
        axios.post('/logout', {}, { withCredentials: true }).then(() => {
            setUserInfo(null);
        });
    };

    const searchPost = (e) => {
        e.preventDefault();
        setSearchValue(searchValueForm);
    };

    return (
        <header>
            <Link
                className='logo'
                onClick={() =>
                    (window.location.href = process.env.REACT_APP_DOMAIN)
                }
            >
                MyBlog
            </Link>
            <form
                className='header-search'
                onSubmit={(e) => {
                    searchPost(e);
                }}
            >
                <input
                    className='search-input'
                    type='text'
                    placeholder='search...'
                    value={searchValueForm}
                    onChange={(e) => {
                        setSearchValueForm(e.target.value);
                    }}
                />
                <button className='search-btn'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
            {userInfo && (
                <div>
                    <nav>
                        <div className='author'>Welcome, {userInfo}</div>
                    </nav>
                    <nav className='controls'>
                        <Link to={'/create'} className='new-post'>
                            <FontAwesomeIcon
                                className='icon'
                                icon={faPenToSquare}
                            />{' '}
                            Write
                        </Link>
                        <Link
                            onClick={(e) => {
                                logoutUser(e);
                            }}
                        >
                            <FontAwesomeIcon
                                className='icon'
                                icon={faArrowRightFromBracket}
                            />{' '}
                            Logout
                        </Link>
                    </nav>
                </div>
            )}

            {!userInfo && (
                <nav>
                    <Link to={'/register'}>Register</Link>
                    <Link to={'/login'}>Login</Link>
                </nav>
            )}
        </header>
    );
}

export default Header;
