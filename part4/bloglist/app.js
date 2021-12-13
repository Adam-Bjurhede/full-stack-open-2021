const http = require('http');
const config = require('./utils/config');
const blogsRouter = require('./controllers/blogs');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((error) => console.log('Error connectiong to MongoDB', error));

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);

module.exports = app;