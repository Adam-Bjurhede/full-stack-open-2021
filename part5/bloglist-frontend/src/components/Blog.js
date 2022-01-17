import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, deleteBlog }) => {
    const [showInfo, setShowInfo] = useState(false);
    const [blogToShow, setBlogToShow] = useState(blog);

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    };

    const handleLikeClick = async () => {
        const res = await blogService.updateBlog(
            {
                user: blogToShow.user,
                likes: blogToShow.likes + 1,
                author: blogToShow.author,
                title: blogToShow.title,
                url: blogToShow.url,
            },
            blog.id
        );

        return setBlogToShow(res);
    };
    const handleRemoveClick = async () => {
        await deleteBlog(blog.id);
    };

    const moreInfo = () => {
        return (
            <>
                <p className='url'>{blogToShow.url}</p>
                <p>
                    Likes: {blogToShow.likes} <button onClick={handleLikeClick}>Like</button>{' '}
                </p>
                <p>{blogToShow.author}</p>
                <button onClick={handleRemoveClick}>Remove</button>
            </>
        );
    };

    return (
        <div style={blogStyle}>
            <div>
                <span className='title'>{blog.title}</span> <span className='author'>{blog.author}</span>
                <button onClick={() => setShowInfo(!showInfo)}>{showInfo ? 'Show Less' : 'Show More'}</button>
            </div>
            {showInfo && moreInfo()}
        </div>
    );
};

export default Blog;
