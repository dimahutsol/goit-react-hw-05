import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.headers.common['Authorization'] =
	'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTM2ZGMzNjAyZTFiN2NlNjlkYTM5YWRkZmUwNmFjYyIsIm5iZiI6MTcyMzkxNjU4My4zNzQ1NTQsInN1YiI6IjY2YzBkMmM4YTA2MjA3NTJhMTkyMTk0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NUi_SdOsxBzLRRfDy9BoDz0FgwpLCpyS6JOe7XF3SAc';

export const fetchPopularMovies = async () => {
	const { data } = await axios.get('trending/movie/day');
	return data;
};

export const fetchMovieById = async id => {
	const { data } = await axios.get(`movie/${id}`);
	return data;
};

export const fetchMoviesByQuery = async query => {
	const { data } = await axios.get(`search/movie`, {
		params: {
			query,
		},
	});
	return data;
};

export const fetchMovieCastById = async id => {
	const { data } = await axios.get(`movie/${id}/credits`);
	return data;
};

export const fetchMovieReviewsById = async id => {
	const { data } = await axios.get(`movie/${id}/reviews`);
	return data;
};

export const fetchConfiguration = async () => {
	const { data } = await axios.get(`configuration`);
	return data;
};
