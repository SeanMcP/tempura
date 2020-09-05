import { h } from 'preact';
import { Link } from 'preact-router';
import { ROUTES } from '../../constants';
import style from './style';
import View from '../../components/view';

const Home = () => (
	<View>
		<p>This is the Home component.</p>
		<Link href={ROUTES.setup}>Play</Link>
	</View>
);

export default Home;
