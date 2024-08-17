import clsx from 'clsx';
import s from './HomePage.module.css';
import { useEffect, useState } from 'react';
import { fetchPopularMovies } from '../../services/api';
import { Link, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import Container from '../../components/Container/Container';

const HomePage = () => {
	const [popularMovies, setPopularMovies] = useState([]);

	const location = useLocation();
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
				<ul className={clsx(s.list)}>
					{popularMovies.map(movie => (
						<li className={clsx(s.listItem)} key={movie.id}>
							<Link
								className={clsx(s.listItemLink)}
								to={`movies/${movie.id}`}
								state={location}>
								{movie.title}
							</Link>
						</li>
					))}
				</ul>
			</Container>
		</div>
	);
};

export default HomePage;
