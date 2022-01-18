describe('Blog app', function () {
    beforeEach(function () {
        const user = {
            name: 'Juni',
            username: 'Junjun',
            password: 'pwd123',
        };

        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        cy.request('POST', 'http://localhost:3003/api/users', user);

        cy.visit('http://localhost:3000');
        cy.contains('Show Form').click();
    });

    it('Login form is shown', function () {
        cy.get('form').should('contain', 'Username');
    });

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('Junjun');
            cy.get('#password').type('pwd123');
            cy.get('#loginBtn').click();

            cy.contains('Junjun is logged in.');
        });

        it('fails with wrong credentials', function () {
            cy.get('#username').type('Junjun');
            cy.get('#password').type('wrongPass');
            cy.get('#loginBtn').click();

            cy.get('h4').should('contain', 'Wrong username or password');
            cy.get('h4').should('have.css', 'color', 'rgb(255, 99, 71)');
            // ...
        });
    });
    describe('When logged in', function () {
        beforeEach(function () {
            // log in user here
            cy.login({ username: 'Junjun', password: 'pwd123' });
        });

        it('A blog can be created', function () {
            cy.contains('Create new blog').click();
            cy.get('#title').type('Blog created by cypress');
            cy.get('#author').type('Cypress');
            cy.get('#url').type('www.cypress.se');
            cy.get('#createBlogBtn').click();

            cy.get('html').should('contain', 'Blog created by cypress Cypress');
        });

        describe('When blogs exist', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'Cypress title1',
                    author: 'Cypress author1',
                    url: 'Cypress url1',
                    likes: 1,
                });
                cy.createBlog({
                    title: 'Cypress title2',
                    author: 'Cypress author2',
                    url: 'Cypress url2',
                    likes: 45,
                });
                cy.createBlog({
                    title: 'Cypress title3',
                    author: 'Cypress author3',
                    url: 'Cypress url3',
                    likes: 35,
                });
            });

            it('it can be liked', function () {
                cy.contains('Cypress title2').parent().find('button').click();
                cy.contains('Like').click();
                cy.get('p').should('contain', 'Likes: 46');
            });
            it('Can be deleted bu user who created blog', function () {
                cy.contains('Cypress title2').parent().find('button').click();
                cy.contains('Remove').click();
                cy.on('windows:confirm', () => true);
                cy.get('html').should('not.contain', 'Cypress title2');
            });
            it('Blogs are ordered by most likes first', function () {
                cy.get('.blog-wrap > div > button ').then((blogs) => {
                    cy.log(blogs[0]).click({ multiple: true });

                    cy.get('.blog-wrap > .likes').then((like) => {
                        cy.get(like[0]).should('contain', 'Likes: 45');
                        cy.get(like[1]).should('contain', 'Likes: 35');
                        cy.get(like[2]).should('contain', 'Likes: 1');
                    });
                });
            });
        });
    });
});
