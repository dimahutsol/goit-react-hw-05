import clsx from 'clsx';
import s from './MoviesPage.module.css';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { fetchMoviesByQuery } from '../../services/api';
import toast from 'react-hot-toast';
import Container from '../../components/Container/Container';
import MoviesList from '../../components/MoviesList/MoviesList';

const MoviesPage = () => {
	const [inputValue, setInputValue] = useState('');
	const [movies, setMovies] = useState([]);

	const [searchParams, setSearchParams] = useSearchParams();

	const location = useLocation();
	const query = searchParams.get('query');
	const notifyWrong = () => toast.error('Something went wrong');

	const handleChangeInput = e => {
		setInputValue(e.target.value);
	};

	const handleSearch = async () => {
		if (!inputValue) return;
		try {
			searchParams.set('query', inputValue);
			setSearchParams(searchParams);
			const data = await fetchMoviesByQuery(inputValue);
			setMovies(data.results);
		} catch {
			notifyWrong();
		}
	};

	useEffect(() => {
		if (!query) return;
		const fetchData = async () => {
			try {
				const data = await fetchMoviesByQuery(query);
				setMovies(data.results);
			} catch {
				notifyWrong();
			}
		};
		fetchData();
	}, [query]);

	useEffect(() => {
		const query = searchParams.get('query') ?? '';
		setInputValue(query);
	}, [searchParams]);

	return (
		<div className={clsx()}>
			<Container>
				<div className={clsx(s.form)}>
					<input type='text' value={inputValue} onChange={handleChangeInput} />
					<button onClick={handleSearch}>Search</button>
				</div>
				<MoviesList movies={movies} />
			</Container>
		</div>
	);
};

export default MoviesPage;
