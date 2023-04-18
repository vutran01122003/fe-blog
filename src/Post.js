import { Link } from 'react-router-dom';
import { format } from 'date-fns';

function Post({ _id, title, summary, createdAt, cover, author }) {
    return (
        <div className='post'>
            <div className='post-img-wrapper'>
                <Link to={`/post/${_id}`} className='post-img-link'>
                    {cover && (
                        <img
                            className='post-img'
                            alt='img'
                            src={`${process.env.REACT_APP_URL}/public/images/${cover}`}
                        />
                    )}
                </Link>
            </div>
            <div className='post-text'>
                <Link to={`/post/${_id}`}>
                    <h2 className='post-title'>{title}</h2>
                </Link>
                <p className='post-info'>
                    <time>
                        {format(new Date(createdAt), 'yyyy-MM-dd hh:mm:ss')}
                    </time>
                    <Link className='author'> by @{author.username}</Link>{' '}
                </p>
                <Link to={`/post/${_id}`}>
                    <p className='post-summary'>{summary}</p>
                </Link>
            </div>
        </div>
    );
}

export default Post;
