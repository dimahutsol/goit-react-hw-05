import Navigation from '../Navigation/Navigation';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<div>
			<Navigation />
			<main>
				<Suspense fallback={<h2>Loading...</h2>}>
					<Outlet />
				</Suspense>
			</main>
		</div>
	);
};

export default Layout;
