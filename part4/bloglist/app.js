const config = require('./utils/config');
//Routers
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
//Middleware
const tokenExtractor = require('./middleware/tokenExtractor');
const userExtractor = require('./middleware/userExtractor');
const { errorHandler, unknownEndpoint } = require('./middleware/errorHandler');
//NPM
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

async function connectDB() {
    try {
        await mongoose.connect(config.MONGODB_URI);

        console.log('Connected to MongoDB');
    } catch (err) {
        console.log('Error connectiong to MongoDB', err);
    }
}
connectDB();

app.use(cors());
app.use(express.json());
app.use(tokenExtractor);

app.use('/api/login', loginRouter);
app.use('/api/blogs', userExtractor, blogsRouter);
app.use('/api/users', usersRouter);

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing');
    app.use('/api/testing', testingRouter);
}

app.use(unknownEndpoint);
app.use(errorHandler);
module.exports = app;
