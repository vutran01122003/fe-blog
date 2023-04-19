import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuillComponent from '../ReactQuillComponent';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, Setsummary] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');
    const [redirect, setRedirect] = useState(false);

    const createPost = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', file);
        if (!title || !summary || !content || !file) {
            alert('Empty input');
        } else {
            axios
                .post('/post', data, {
                    withCredentials: true
                })
                .then(() => {
                    alert('Create new post successfully');
                    setRedirect(true);
                })
                .catch((e) => {
                    alert('Lỗi đăng nhập');
                    window.location.href = process.env.REACT_APP_DOMAIN;
                });
        }
    };

    if (redirect) return <Navigate to={'/'} />;

    return (
        <form
            className='create-post'
            onSubmit={(e) => {
                createPost(e);
            }}
        >
            <input
                type='text'
                placeholder='Title'
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            />
            <input
                type='text'
                placeholder='Summary'
                value={summary}
                onChange={(e) => {
                    Setsummary(e.target.value);
                }}
            />
            <span className='input-file'>
                <span>Featured Image: </span>
                <input
                    type='file'
                    onChange={(e) => {
                        setFile(e.target.files[0]);
                    }}
                    className='select-img-post'
                    accept='image/png, image/gif, image/jpeg'
                />
            </span>
            <ReactQuillComponent content={content} setContent={setContent} />
            <button className='post-btn'>Post</button>
        </form>
    );
}

export default CreatePost;
