import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from './Blog';

describe('Blog', () => {
    it('Renders blog title and author but not url', () => {
        const blog = {
            title: 'Ny titel',
            url: 'www.test.se',
            author: 'Adam',
        };

        const component = render(<Blog blog={blog} />);

        const title = component.getByText(blog.title);
        const author = component.getByText(blog.author);
        const url = component.queryByText(blog.url);

        expect(title).toBeInTheDocument();
        expect(author).toBeInTheDocument();
        expect(url).not.toBeInTheDocument();
    });
});
