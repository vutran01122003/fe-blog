import './App.css';

import Layout from './Layout';
import { Routes, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './UserContext';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import UpdatePost from './pages/UpdatePost';
import axios from 'axios';

function App() {
    axios.defaults.baseURL = process.env.REACT_APP_URL_BASE_API;
    axios.defaults.withCredentials = true;
    return (
        <UserContextProvider>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<IndexPage />} />
                    <Route path={'/login'} element={<LoginPage />} />
                    <Route path={'/register'} element={<RegisterPage />} />
                    <Route path={'/create'} element={<CreatePost />} />
                    <Route path={'/post/:id'} element={<PostPage />} />
                    <Route path={'/edit/:id'} element={<UpdatePost />} />
                </Route>
            </Routes>
        </UserContextProvider>
    );
}

export default App;
