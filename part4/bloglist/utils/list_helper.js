const _ = require('lodash');

const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	return blogs.reduce((acc, curr) => {
		return acc + curr.likes;
	}, 0);
};

const favouriteBlog = (blogs) => {
	return blogs.reduce((acc, curr) => {
		return acc.likes > curr.likes
			? { title: acc.title, author: acc.author, likes: acc.likes }
			: { title: curr.title, author: curr.author, likes: curr.likes };
	}, 0);
};

const mostBlogs = (blogs) => {
	if (blogs.length === 0) {
		return null;
	}

	const authors = blogs.map((blog) => blog.author);
	const numberOfBlogs = _.countBy(authors);
	const mostBlogs = Object.entries(numberOfBlogs).reduce((acc, cur) => {
		return acc[1] > cur[1] ? acc : cur;
	}, 0);

	return { author: mostBlogs[0], blogs: mostBlogs[1] };
};

const mostLikes = (blogs) => {
	if (blogs.length === 0) {
		return null;
	}

	const totalLikesObject = blogs.reduce((acc, curr) => {
		return !acc[curr.author]
			? { ...acc, [curr.author]: curr.likes }
			: { ...acc, [curr.author]: acc[curr.author] + curr.likes };
	}, {});

	const mostLikesArr = Object.entries(totalLikesObject).reduce((acc, curr) => {
		return acc[1] > curr[1] ? acc : curr;
	});
	console.log(mostLikesArr);
	return {
		author: mostLikesArr[0],
		likes: mostLikesArr[1],
	};
};

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes };
