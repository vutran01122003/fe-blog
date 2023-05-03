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

    const updatePostHandle = (data) => {
        axios
            .put(`/post/${id}`, data, {
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
            .catch((e) => {});
    }, [id]);

    const createPost = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('cover', cover);
        const reader = new FileReader();
        if(file) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                data.set('file',  reader.result);
                updatePostHandle(data);
            }   
        } else {
            data.set('file', '');
            updatePostHandle(data);
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
            <ReactQuillComponent  content={content} setContent={setContent}/>
            <button className='post-btn'>Post</button>
        </form>
    );
}

export default UpdatePost;
