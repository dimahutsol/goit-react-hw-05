import clsx from 'clsx';
import s from './MovieDetailsPage.module.css';
import { Suspense, useEffect, useRef, useState } from 'react';
import { fetchConfiguration, fetchMovieById } from '../../services/api';
import {
	Link,
	Outlet,
	useLocation,
	useNavigate,
	useParams,
} from 'react-router-dom';
import toast from 'react-hot-toast';
import Container from '../../components/Container/Container';

const MovieDetailsPage = () => {
	const [movie, setMovie] = useState({});
	const [configuration, setConfiguration] = useState();
	const [isLoading, setIsLoading] = useState(true);

	const { movieId } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const goBackRef = useRef(location.state ?? '/movies');
	const notifyWrong = () => toast.error('Something went wrong');

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const data = await fetchMovieById(movieId);
				const config = await fetchConfiguration();
				setMovie(data);
				setConfiguration(config);
			} catch {
				notifyWrong();
				setIsLoading(false);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, [movieId]);

	return (
		<div className={clsx()}>
			<Container>
				<button onClick={() => navigate(goBackRef.current)}>Go back</button>
				{!isLoading && (
					<>
						<img
							src={`${configuration.images.base_url}w342${movie.poster_path}`}
							alt=''
						/>
						<h3>Additional information</h3>
						<ul>
							<li>
								<Link to='cast'>Cast</Link>
							</li>
							<li>
								<Link to='reviews'>Reviews</Link>
							</li>
						</ul>
					</>
				)}
				<Suspense fallback={<h2>MovieDetailsPage Suspense 1</h2>}>
					<Outlet />
				</Suspense>
			</Container>
		</div>
	);
};

export default MovieDetailsPage;
