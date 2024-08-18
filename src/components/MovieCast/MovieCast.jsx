import clsx from 'clsx';
import s from './MovieCast.module.css';
import { useEffect, useState } from 'react';
import { fetchConfiguration, fetchMovieCastById } from '../../services/api';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const MovieCast = () => {
	const [actors, setActors] = useState([]);
	const [configuration, setConfiguration] = useState();
	console.log(configuration);

	const { movieId } = useParams();
	const notifyWrong = () => toast.error('Something went wrong');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchMovieCastById(movieId);
				const config = await fetchConfiguration();
				setActors(data.cast);
				setConfiguration(config);
			} catch {
				notifyWrong();
			}
		};
		fetchData();
	}, [movieId]);

	return (
		<div>
			<ul className={clsx(s.list)}>
				{actors.map(actor => (
					<li className={clsx(s.listItem)} key={actor.id}>
						{actor.profile_path && (
							<img
								className={clsx(s.image)}
								src={`${configuration.images.base_url}w185${actor.profile_path}`}
								alt={actor.original_name}
							/>
						)}
						<h3 className={clsx(s.name)}>{actor.original_name}</h3>
						<p>
							<span className={clsx(s.category)}>Character:</span>{' '}
							{actor.character}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default MovieCast;
