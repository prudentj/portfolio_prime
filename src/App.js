import React from 'react';
import './styles/app.css';
import Portfolio from './components/Portfolio';
import SortingHat from './components/SortingHat'
import GameOfLife from './components/GameOfLife';
import Market from './components/Market';
import AboutMe from './components/AboutMe';
function App() {
	return (
		<div className='scrollbar'>
			<Portfolio />
			<SortingHat />
			<GameOfLife />
			<Market />
			<AboutMe />
			
		</div>
	);
}

export default App;
