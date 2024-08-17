import clsx from 'clsx';
import s from './MovieCast.module.css';
import { useEffect, useState } from 'react';
import { fetchConfiguration, fetchMovieCastById } from '../../services/api';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const MovieCast = () => {
	const [actors, setActors] = useState([]);
	const [configuration, setConfiguration] = useState();

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
		<div className={clsx()}>
			<ul>
				{actors.map(actor => (
					<li key={actor.id}>
						{actor.profile_path && (
							<img
								src={`${configuration.images.base_url}w342${actor.profile_path}`}
								alt={actor.original_name}
							/>
						)}
						<h3>{actor.original_name}</h3>
						<p>Character: {actor.character}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default MovieCast;
