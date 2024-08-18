import clsx from 'clsx';
import s from './MovieReviews.module.css';
import { useEffect, useState } from 'react';
import { fetchMovieReviewsById } from '../../services/api';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const MovieReviews = () => {
	const [reviews, setReviews] = useState([]);

	const { movieId } = useParams();
	const notifyWrong = () => toast.error('Something went wrong');

	const convertDate = isoDate => {
		let date = new Date(isoDate);

		let day = String(date.getUTCDate()).padStart(2, '0');
		let month = String(date.getUTCMonth() + 1).padStart(2, '0');
		let year = date.getUTCFullYear();

		return `${day}.${month}.${year}`;
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchMovieReviewsById(movieId);
				setReviews(data.results);
			} catch {
				notifyWrong();
			}
		};
		fetchData();
	}, [movieId]);

	return (
		<div className={clsx()}>
			{reviews.length > 0 ? (
				<ul className={clsx(s.list)}>
					{reviews.map(review => (
						<li className={clsx(s.listItem)} key={review.id}>
							<p className={clsx(s.author)}>
								<span className={clsx(s.category)}>Author: </span>
								{review.author}
							</p>
							<p className={clsx(s.content)}>{review.content}</p>
							<p className={clsx(s.date)}>{convertDate(review.created_at)}</p>
						</li>
					))}
				</ul>
			) : (
				<p>No reviews</p>
			)}
		</div>
	);
};

export default MovieReviews;
