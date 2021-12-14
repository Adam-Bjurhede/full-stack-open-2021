const config = require('./utils/config');
const blogsRouter = require('./controllers/blogs');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

async function connectDB() {
	try {
		await mongoose.connect(config.MONGODB_URI);

		console.log('Connected to MongoDB');
	} catch (err) {
		console.log('Error connectiong to MongoDB', error);
	}
}
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);

module.exports = app;
