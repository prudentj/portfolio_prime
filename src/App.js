import React from 'react';
import './styles/app.css';
import Portfolio from './components/Portfolio';
import SortingHat from './components/SortingHat'
import GameOfLife from './components/GameOfLife';
import Market from './components/Market';
function App() {
	return (
		<>
			<Portfolio />
			<SortingHat />
			<GameOfLife />
			<Market />
		</>
	);
}

export default App;
