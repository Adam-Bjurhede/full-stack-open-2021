import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

describe('BlogForm', () => {
    it('Calls the event handler', () => {
        const mockCreateBlog = jest.fn();

        const component = render(<BlogForm createBlog={mockCreateBlog} />);

        const form = component.container.querySelector('form');
        const title = component.container.querySelector('#title');
        const author = component.container.querySelector('#author');
        const url = component.container.querySelector('#url');

        fireEvent.change(title, {
            target: { value: 'Ny titel' },
        });
        fireEvent.change(author, {
            target: { value: 'Juni' },
        });
        fireEvent.change(url, {
            target: { value: 'www.test.se' },
        });

        fireEvent.submit(form);

        console.log(mockCreateBlog.mock.calls[0][0]);

        expect(mockCreateBlog.mock.calls).toHaveLength(1);
        expect(mockCreateBlog.mock.calls[0][0].title).toBe('Ny titel');
        expect(mockCreateBlog.mock.calls[0][0].url).toBe('www.test.se');
        expect(mockCreateBlog.mock.calls[0][0].author).toBe('Juni');

        expect(form).toBeInTheDocument();
    });
});
