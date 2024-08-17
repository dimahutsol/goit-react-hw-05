import clsx from 'clsx';
import s from './Layout.module.css';
import Navigation from '../Navigation/Navigation';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<div className={clsx()}>
			<Navigation />
			<main>
				<Suspense fallback={<h2>Layout Suspense</h2>}>
					<Outlet />
				</Suspense>
			</main>
		</div>
	);
};

export default Layout;
