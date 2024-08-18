import clsx from 'clsx';
import s from './MoviesList.module.css';
import { Link, useLocation } from 'react-router-dom';

const MoviesList = ({ movies }) => {
	const location = useLocation();

	return (
		<ul>
			<ul className={clsx(s.list)}>
				{movies.map(movie => (
					<li className={clsx(s.listItem)} key={movie.id}>
						<Link
							className={clsx(s.listItemLink)}
							to={`/movies/${movie.id}`}
							state={location}>
							{movie.title}
						</Link>
					</li>
				))}
			</ul>
		</ul>
	);
};

export default MoviesList;
