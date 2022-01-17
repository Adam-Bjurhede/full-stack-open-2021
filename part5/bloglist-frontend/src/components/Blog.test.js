import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('Blog', () => {
    let component;
    const mockLikeFn = jest.fn();
    const blog = {
        title: 'Ny titel',
        url: 'www.test.se',
        author: 'Adam',
        likes: 53,
    };
    beforeEach(() => {
        component = render(<Blog blog={blog} updateBlog={mockLikeFn} />);
    });

    it('Renders blog title and author but not url', () => {
        // const component = render(<Blog blog={blog} />);

        const title = component.getByText(blog.title);
        const author = component.getByText(blog.author);
        const url = component.queryByText(blog.url);

        expect(title).toBeInTheDocument();
        expect(author).toBeInTheDocument();
        expect(url).not.toBeInTheDocument();
    });

    it('the blog`s url and number of likes are shown when the button controlling the shown details has been clicked', () => {
        const showMoreBtn = component.getByRole('button', { name: 'Show More' });
        expect(showMoreBtn).toBeInTheDocument();

        fireEvent.click(showMoreBtn);

        const likes = component.getByText(`Likes: ${blog.likes}`);
        const url = component.getByText(blog.url);

        expect(likes).toBeInTheDocument();
        expect(url).toBeInTheDocument();
    });
    it('if the like button is clicked twice, the event handler the component received as props is called twice.', async () => {
        const showMoreBtn = component.getAllByRole('button', { name: 'Show More' });

        fireEvent.click(showMoreBtn[0]);

        const likeBtn = component.getByRole('button', { name: 'Like' });

        fireEvent.click(likeBtn);
        fireEvent.click(likeBtn);
        expect(mockLikeFn.mock.calls).toHaveLength(2);
    });
});
