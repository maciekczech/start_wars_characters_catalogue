import React from 'react';
import Layout from './components/Layout/Layout';
import CharactersList from './containers/CharactersList/CharactersList';

function App() {
	return (
		<Layout>
			<CharactersList></CharactersList>
		</Layout>
	);
}

export default App;
