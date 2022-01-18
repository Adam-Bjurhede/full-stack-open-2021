Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
        username,
        password,
    }).then(({ body }) => {
        console.log(body);
        localStorage.setItem('user', JSON.stringify(body));
        cy.visit('http://localhost:3000');
        cy.contains('Junjun is logged in.');
    });
});

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
    cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: { title, author, url, likes },
        headers: {
            Authorization: `bearer ${JSON.parse(localStorage.getItem('user')).token}`,
        },
    });

    cy.visit('http://localhost:3000');
});
