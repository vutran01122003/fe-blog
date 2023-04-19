import { useState, useContext } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);

    const registerUser = (e) => {
        e.preventDefault();
        axios
            .post(
                '/register',
                { username, password },
                { withCredentials: true }
            )
            .then((respone) => {
                alert('register successs');
                setUserInfo(respone.data);
                setRedirect(true);
            })
            .catch((e) => {
                alert('register failed');
            });
    };

    if (redirect) {
        return <Navigate to={'/'} />;
    }

    return (
        <>
            <h2 className='title_form'>Register</h2>
            <form
                className='register'
                onSubmit={(e) => {
                    registerUser(e);
                }}
            >
                <input
                    type='text'
                    placeholder='username'
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <input
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <button>Register</button>
            </form>
        </>
    );
}

export default RegisterPage;
