import axios from 'axios';
import Post from '../Post';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { faFaceFrown } from '@fortawesome/free-regular-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Backdrop, CircularProgress} from '@material-ui/core';
function IndexPage() {
    let numPage = 1;

    const limit = 5;
    const [posts, setPosts] = useState([]);
    const { searchValue } = useContext(UserContext);
    const [numPost, SetNumPost] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const getPrevPage = (currentPage) => {
        const page = currentPage - 1;

        if (page < 1) {
            return;
        } else {
            setCurrentPage(page);
            getPage(page, limit);
        }
    };


    const getNextPage = (currentPage) => {
        const page = currentPage + 1;
        if (page > numPage) {
            return;
        } else {
            setCurrentPage(page);
            getPage(page, limit);
        }
    };

    const getPage = (page, limit) => {
        axios
            .get(
                `/post?title=${
                    searchValue === '' ? null : searchValue
                }&page=${page}&limit=${limit}`
            )
            .then((respone) => {
                setPosts(respone.data);
            })
            .catch((e) => {});
    };

    useEffect(() => {
        getPage(1, limit);
        axios
            .get(`/numPost?title=${searchValue}`)
            .then((respone) => {
                SetNumPost(respone.data.result);
            })
            .catch((e) => {});
        // eslint-disable-next-line
    }, [searchValue]);

    numPage = Math.ceil(numPost / limit);
    const pages = Array.from({ length: numPage }, (_, i) => i + 1);

    return (
        <>
            {
                posts.length > 0 ? posts.map((post, index) => <Post {...post} key={index} />) :
                <Backdrop
                    className='backdrop'
                    sx={{ color: '#fff'}}
                    open={true}
                    style={{zIndex: 999}}
                >
                    <CircularProgress style={{color: 'white'}} />
                    <h3>Vui lòng chờ, máy chủ cần thời gian để khởi động</h3>
                </Backdrop>    
            }
            {numPage > 1 && (
                <div className='pagination-wrapper'>
                    <div className='pagination'>
                        <Link
                            onClick={(e) => {
                                getPrevPage(currentPage);
                            }}
                        >
                            &laquo;
                        </Link>

                        {pages.map((page, index) => (
                            <Link
                                className={
                                    index + 1 === currentPage ? 'active' : null
                                }
                                key={index}
                                onClick={(e) => {
                                    setCurrentPage(index + 1);
                                    getPage(index + 1, limit);
                                }}
                            >
                                {index + 1}
                            </Link>
                        ))}

                        <Link
                            onClick={(e) => {
                                getNextPage(currentPage);
                            }}
                        >
                            &raquo;
                        </Link>
                    </div>
                </div>
            )}
            {numPage === 0 && (
                <div className='empty-search'>
                    <FontAwesomeIcon icon={faFaceFrown} />
                    <h3>No post results</h3>
                </div>
            )}
        </>
    );
}

export default IndexPage;
