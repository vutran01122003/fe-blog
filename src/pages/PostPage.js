import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { UserContext } from '../UserContext';

function PostPage() {
    const [post, setPost] = useState('');
    const [username, setUsername] = useState('');
    const [cover, setCover] = useState('');
    const [date, setDate] = useState(new Date());
    const { id } = useParams();
    const { userInfo } = useContext(UserContext);

    useEffect(() => {
        axios.get(`/post/${id}`).then((postInfo) => {
            setPost(postInfo.data);
            setUsername(postInfo.data.author.username);
            setDate(new Date(postInfo.data.createdAt));
            setCover(postInfo.data.cover);
        });
    }, [id]);

    const formattedDate = format(date, 'MMM d, yyyy');
    const deletePost = (e) => {
        e.preventDefault();
        axios
            .delete(`/delete/${id}`)
            .then((data) => {
                window.location.href = process.env.REACT_APP_DOMAIN;
            })
            .catch((e) => {
                alert('can not delete post');
            });
    };

    return (
        <div className='post-page'>
            <h1 className='post-page-title'>{post.title}</h1>
            <span className='post-page-info'>
                <span className='post-page-info-time'>{formattedDate}</span>
                <span className='post-page-info-username'> by @{username}</span>
                {(userInfo.username === username ||
                    userInfo.role === 'admin') && (
                    <span className='post-page-controls'>
                        <span className='control-btn edit-btn'>
                            <Link to={`/edit/${id}`}>Edit post</Link>
                        </span>
                        <span className='control-btn delete-btn'>
                            <Link onClick={deletePost}>Delete post</Link>
                        </span>
                    </span>
                )}
            </span>

            <div className='post-page-img-wrapper'>
                {cover && (
                    <img
                        src={`${process.env.REACT_APP_URL_BASE_API}/public/images/${post.cover}`}
                        alt=''
                    />
                )}
            </div>
            <div
                className='post-page-content'
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </div>
    );
}

export default PostPage;
