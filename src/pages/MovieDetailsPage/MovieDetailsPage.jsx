import clsx from 'clsx';
import s from './MovieDetailsPage.module.css';
import { Suspense, useEffect, useRef, useState } from 'react';
import { fetchConfiguration, fetchMovieById } from '../../services/api';
import {
	NavLink,
	Outlet,
	useLocation,
	useNavigate,
	useParams,
} from 'react-router-dom';
import toast from 'react-hot-toast';
import Container from '../../components/Container/Container';
import Loader from '../../components/Loader/Loader';

const MovieDetailsPage = () => {
	const [movie, setMovie] = useState({});
	const [configuration, setConfiguration] = useState();
	const [isLoading, setIsLoading] = useState(true);

	const { movieId } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const goBackRef = useRef(location.state ?? '/movies');
	const notifyWrong = () => toast.error('Something went wrong');

	const buildLinkClass = ({ isActive }) => {
		return clsx(s.link, isActive && s.linkActive);
	};

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
		<div className={clsx(s.detailsPage)}>
			<Container>
				<button
					className={clsx(s.backButton)}
					onClick={() => navigate(goBackRef.current)}>
					Go back
				</button>
				{isLoading && <Loader />}
				{!isLoading && (
					<div className={clsx(s.wrapper)}>
						<div className={clsx(s.mainPart)}>
							<img
								src={`${configuration.images.base_url}w342${movie.poster_path}`}
								alt=''
							/>
							<div className={clsx(s.info)}>
								<h3 className={clsx(s.title)}>{movie.title}</h3>
								<p>
									<span className={clsx(s.category)}>Overview: </span>
									{movie.overview}
								</p>
								<p>
									<span className={clsx(s.category)}>Genres: </span>
									{movie.genres.map(genre => genre.name).join(', ')}
								</p>
								<p>
									<span className={clsx(s.category)}>Rate: </span>
									{movie.vote_average}
								</p>
							</div>
						</div>
						<div>
							<h3 className={clsx(s.subtitle)}>Additional information</h3>
							<ul className={clsx(s.additional)}>
								<li>
									<NavLink className={buildLinkClass} to='cast'>
										Cast
									</NavLink>
								</li>
								<li>
									<NavLink className={buildLinkClass} to='reviews'>
										Reviews
									</NavLink>
								</li>
							</ul>
						</div>
					</div>
				)}
				<Suspense fallback={<h2>Loading...</h2>}>
					<Outlet />
				</Suspense>
			</Container>
		</div>
	);
};

export default MovieDetailsPage;
