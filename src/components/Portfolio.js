//Libraries and Components
import React, { useRef, useEffect } from 'react';
import ContactNav from './ContactNav';
import ProjectCard from './ProjectCard';
import openOverlay from "../utilities/openOverlay"
//Images
import Zebra from './img/zebrastripes.jpg';
import WhiteCat from './img/whitecat.jpg';
import Wall from './img/whitewall.jpg';

//Animations
import gsaper from '../utilities/gsaper';

const Portfolio = () => {
	let mainHeading = useRef(null);
	let project1 = useRef(null);
	//Functions for animation
	const executeScroll = () => window.scrollTo(0, project1.current.offsetTop)
	useEffect(() => {
		gsaper(true, mainHeading);
	}, []);
	return (
		<div className="bg-primary ">
			<section className="sm:flex-col lg:flex-row-reverse lg:h-screen lg:relative">
				<img
					className="md:z-0 max-full relative object-cover object-center md:h-screen md:max-h-screen lg:absolute lg:right-0"
					src="https://images.unsplash.com/photo-1578836537282-3171d77f8632?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
					ref={(el) => {
						mainHeading = el;
					}}
					alt="Mountain in the clouds"
				/>

				<div
					className="py-10 md:absolute md:top-0 md:left-0 flex flex-col justify-center md:z-10  md:w-1/2 md:h-screen px-10 md:px-20 text-white bg-black opacity-0"
					ref={(el) => {
						mainHeading = el;
					}}
				>
					<h1 className="py-2 text-4xl md:text-6xl text-white">
						Jacob Prudent
					</h1>
					<p className="py-10 text-3xl ">
						Adept with React and Node, I am a full stack developer, who loves mastering new skills and
						discovering a challenge.
					</p>
					<div className="display flex">
						<button
							className="px-1 py-2 md:py-4 mx-1 border border-white text-white bg-transparent rounded-full hover:bg-primary hover:text-white lg:w-1/2 text-lg outline-none"
							onClick={executeScroll}
						>
							View My Projects
					</button>
						<button
							className="px-1 py-2 md:py-4 mx-1 border border-white text-white bg-transparent rounded-full hover:bg-primary hover:text-white lg:w-1/2 text-lg outline-none"
							//I need to write a script to scroll to the first project
							onClick={() => { openOverlay("AboutMe") }}
						>
							About Me
					</button>
					</div>
				</div>
			</section>
			<section ref={project1}>
				<ProjectCard
					pic={WhiteCat}
					picOnLeft={false}
					picAlt="Mischievous Magical Cat"
					cardTitle="Sorting Hat"
					cardDesc="Quiz web application to sort prospective tech students into relevant tracks of education."
					overlayName="SortingHat"
				/>
			</section>
			<section>
				<ProjectCard
					pic={Zebra}
					picOnLeft={true}
					picAlt="Zebra Hide Closeup"
					cardTitle="Africa Connected"
					cardDesc="A simple small online marketplace for posting and viewing wares"
					overlayName="Market"
				/>
			</section>
			<section>
				<ProjectCard
					pic={Wall}
					picOnLeft={false}
					picAlt="Vines growing on a white wall"
					cardTitle="Game of Life"
					cardDesc="Emergent order from simple rules. Conway's game of life show's the marvel of cellular automatons."
					overlayName="GameOfLife"
				/>
			</section>
			<ContactNav />
		</div >
	);
};
export default Portfolio;
