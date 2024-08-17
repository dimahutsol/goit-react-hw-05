import clsx from 'clsx';
import s from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import Container from '../Container/Container';

const buildLinkClass = ({ isActive }) => {
	return clsx(s.link, isActive && s.linkActive);
};

const Navigation = () => {
	return (
		<header className={clsx(s.header)}>
			<Container>
				<nav className={clsx(s.nav)}>
					<NavLink to='/' className={buildLinkClass}>
						Home
					</NavLink>
					<NavLink to='movies' className={buildLinkClass}>
						Movies
					</NavLink>
				</nav>
			</Container>
		</header>
	);
};

export default Navigation;
