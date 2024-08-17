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
				<ul>
					{reviews.map(review => (
						<li key={review.id}>
							<p>Author: {review.author}</p>
							<p>{review.content}</p>
							<p>{review.created_at}</p>
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
