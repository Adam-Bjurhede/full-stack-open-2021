import React, { useState } from 'react';

const Blog = ({ blog, deleteBlog, updateBlog }) => {
    const [showInfo, setShowInfo] = useState(false);
    // const [blog, setBlog] = useState(blog);

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    };

    const handleLikeClick = async () => {
        try {
            const blogToUpdate = { ...blog, likes: blog.likes + 1 };
            await updateBlog(blogToUpdate, blog.id);
        } catch (error) {
            console.log(error);
        }
    };
    const handleRemoveClick = async () => {
        await deleteBlog(blog.id);
    };

    const moreInfo = () => {
        return (
            <>
                <p className='url'>{blog.url}</p>
                <p className='likes'>
                    Likes: {blog.likes} <button onClick={handleLikeClick}>Like</button>{' '}
                </p>
                <p>{blog.author}</p>
                <button onClick={handleRemoveClick}>Remove</button>
            </>
        );
    };

    return (
        <div className='blog-wrap' style={blogStyle}>
            <div>
                <span className='title'>{blog.title}</span> <span className='author'>{blog.author}</span>
                <button onClick={() => setShowInfo(!showInfo)}>{showInfo ? 'Show Less' : 'Show More'}</button>
            </div>
            {showInfo && moreInfo()}
        </div>
    );
};

export default Blog;
