import { useContext, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { userInfo, setUserInfo } = useContext(UserContext);
    const LoginUser = (e) => {
        e.preventDefault();
        axios
            .post('/login', { username, password }, { withCredentials: true })
            .then((respone) => {
                alert('login success');
                setUserInfo(respone.data);
                setRedirect(true);
            })
            .catch((e) => {
                alert('login failed');
            });
    };

    console.log(userInfo);
    if (redirect) {
        return <Navigate to={'/'} />;
    }

    return (
        <>
            <h2 className='title_form'>Login</h2>
            <form
                className='login'
                onSubmit={(e) => {
                    LoginUser(e);
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
                <button>Login</button>
            </form>
        </>
    );
}

export default LoginPage;
