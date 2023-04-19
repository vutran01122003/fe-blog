import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactQuillComponent from '../ReactQuillComponent';

function UpdatePost() {
    const [title, setTitle] = useState('');
    const [summary, Setsummary] = useState('');
    const [content, setContent] = useState('');
    const [cover, setCover] = useState('');
    const [file, setFile] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`/post/${id}`)
            .then((respone) => {
                const { title, summary, content, cover } = respone.data;
                Setsummary(summary);
                setTitle(title);
                setContent(content);
                setCover(cover);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [id]);

    const createPost = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('cover', cover);
        data.set('file', file);
        if (!title || !summary || !content) {
            alert('Empty input');
        } else {
            axios
                .put(`/post/${id}`, data, {
                    withCredentials: true
                })
                .then(() => {
                    alert('Create new post successfully');
                    setRedirect(true);
                })
                .catch((e) => {
                    console.log(e);
                    alert('Lỗi đăng nhập');
                    window.location.href = process.env.REACT_APP_DOMAIN;
                });
        }
    };

    if (redirect) return <Navigate to={`/post/${id}`} />;

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
                <span>Featured Images: </span>
                <input
                    type='file'
                    onChange={(e) => {
                        setFile(e.target.files[0]);
                    }}
                    className='select-img-post'
                    accept='image/png, image/gif, image/jpeg'
                />
            </span>
            <ReactQuillComponent content setContent />
            <button className='post-btn'>Post</button>
        </form>
    );
}

export default UpdatePost;
