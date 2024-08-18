import clsx from 'clsx';
import s from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';
import Container from '../../components/Container/Container';

const NotFoundPage = () => {
	return (
		<div className={clsx(s.wrapper)}>
			<Container>
				<div className={clsx(s.box)}>
					<h2 className={clsx(s.oops)}>{`:(`}</h2>
					<p className={clsx(s.text)}>There is no such page</p>
					<Link className={clsx(s.button)} to='/'>
						Go Home
					</Link>
				</div>
			</Container>
		</div>
	);
};

export default NotFoundPage;
