import clsx from 'clsx';
import s from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';
import Container from '../../components/Container/Container';

const NotFoundPage = () => {
	return (
		<div className={clsx()}>
			<Container>
				<h2>NotFoundPage</h2>
				<Link to='/'>Go Home</Link>
			</Container>
		</div>
	);
};

export default NotFoundPage;
