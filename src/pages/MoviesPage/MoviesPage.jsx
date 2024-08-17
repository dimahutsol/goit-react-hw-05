import clsx from 'clsx';
import s from './MoviesPage.module.css';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { fetchMoviesByQuery } from '../../services/api';
import toast from 'react-hot-toast';
import Container from '../../components/Container/Container';

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
				<div>
					<input type='text' value={inputValue} onChange={handleChangeInput} />
					<button onClick={handleSearch}>Search</button>
				</div>
				<ul>
					{movies.map(movie => (
						<li key={movie.id}>
							<Link to={`${movie.id}`} state={location}>
								{movie.original_title}
							</Link>
						</li>
					))}
				</ul>
			</Container>
		</div>
	);
};

export default MoviesPage;
