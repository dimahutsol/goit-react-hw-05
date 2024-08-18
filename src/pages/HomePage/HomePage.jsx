import clsx from 'clsx';
import s from './HomePage.module.css';
import { useEffect, useState } from 'react';
import { fetchPopularMovies } from '../../services/api';
import toast from 'react-hot-toast';
import Container from '../../components/Container/Container';
import MoviesList from '../../components/MoviesList/MoviesList';

const HomePage = () => {
	const [popularMovies, setPopularMovies] = useState([]);

	const notifyWrong = () => toast.error('Something went wrong');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchPopularMovies();
				setPopularMovies(data.results);
			} catch {
				notifyWrong();
			}
		};
		fetchData();
	}, []);

	return (
		<div className={clsx(s.home)}>
			<Container>
				<h2 className={clsx(s.title)}>Trending today</h2>
				<MoviesList movies={popularMovies} />
			</Container>
		</div>
	);
};

export default HomePage;
