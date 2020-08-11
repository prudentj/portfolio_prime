//Libraries and Components
import React, { useRef, useEffect, useState } from 'react';
import Contact from './Contact';

//Images
import Zebra from './img/zebrastripes.jpg';
import WhiteCat from './img/whitecat.jpg';
import Wall from './img/whitewall.jpg';
import Resume from './img/Resume.pdf';


//Icons
import TwitterLogo from './icons/twitter.svg'
import GithubLogo from './icons/github.svg'
import LinkedInLogo from './icons/linkedin.svg'
import ResumeLogo from './icons/paperclip.svg'
import EmailLogo from './icons/email.svg'


//Animations
import { TweenMax, Power1 } from 'gsap';
import VisibilitySensor from 'react-visibility-sensor';
//Visibility Sensor seems to have a conflict with GSAP Where the two fight and neither works I can place the sensor on something near by though which can help

//Repeated Tailwind
const CardGen =
	'bg-black text-white md:w-2/3 flex flex-col relative justify-center py-10 px-10 lg:px-20 ';
const ButtonGen =
	'px-1 py-2 md:py-4 mx-1 border border-white text-white bg-transparent rounded-full hover:bg-primary hover:text-white lg:w-1/2 text-lg outline-none';
const HeaderGen = 'text-4xl text-white';

//Scroll Function

const Portfolio = () => {

	//State for animation to reveal photos
	const [iViz2, setIViz2] = useState(false);
	const [iViz3, setIViz3] = useState(false);
	const [iViz4, setIViz4] = useState(false);

	//State for rendering subcomponents
	const [showContact, setShowContact] = useState(false)

	//Functions for rendering subcomponents

	function openNavById(el) {
		document.getElementById(el).style.width = "100%";
		document.body.className = "overflow-hidden";
	}

	let mainHeading = useRef(null);
	let image2 = useRef(null);
	let image3 = useRef(null);
	let image4 = useRef(null);
	let project1 = useRef(null);


	//Functions for animation
	const executeScroll = () => window.scrollTo(0, project1.current.offsetTop)

	function onChange(isVisible, callback) {
		callback(isVisible);
	}

	function gsaper(state, imageRef) {
		if (state) {
			TweenMax.to(imageRef, 0.8, {
				opacity: 1,
				ease: Power1.easeOut,
			});
		}
	}
	useEffect(() => {
		gsaper(true, mainHeading);
	}, []);
	useEffect(() => {
		gsaper(iViz2, image2);
	}, [iViz2]);
	useEffect(() => {
		gsaper(iViz3, image3);
	}, [iViz3]);
	useEffect(() => {
		gsaper(iViz4, image4);
	}, [iViz4]);

	return (
		<div className="bg-primary ">
			<section className="sm:flex-col md:flex-row-reverse md:h-screen md:relative">
				<img
					className="md:z-0 max-full relative object-cover object-center md:h-screen md:max-h-screen lg:absolute lg:right-0"
					src="https://images.unsplash.com/photo-1578836537282-3171d77f8632?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
					ref={(el) => {
						image2 = el;
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
							//I need to write a script to scroll to the first project
							onClick={executeScroll}
						>
							View My Projects
					</button>
						<button
							className="px-1 py-2 md:py-4 mx-1 border border-white text-white bg-transparent rounded-full hover:bg-primary hover:text-white lg:w-1/2 text-lg outline-none"
							//I need to write a script to scroll to the first project
							onClick={() => { openNavById("AboutMe") }}
						>
							About Me
					</button>
					</div>


				</div>
			</section>
			<section ref={project1}>
				<div className="flex flex-col md:flex md:flex-row md:flex-no-wrap">
					<img
						className="md:w-1/3 opacity-0 max-full relative object-cover object-center"
						src={WhiteCat}
						alt="Witch with pointy hat reading a book"
						ref={(el) => {
							image2 = el;
						}}
					/>

					<div className={CardGen}>
						<h1 className={HeaderGen} id="project1" >
							Sorting Hat
						</h1>
						<p className="py-10 text-3xl">Quiz web application to sort prospective tech students into relevant tracks of education.</p>
						<VisibilitySensor onChange={(onChange, setIViz2)}>
							<button className={ButtonGen} onClick={() => { openNavById("SortingHat") }}>View My Project</button>
						</VisibilitySensor>
					</div>
				</div>
			</section>
			<section>
				<div className="flex flex-col md:flex md:flex-row-reverse md:flex-no-wrap">
					<img
						className="md:w-1/3 opacity-0 max-full relative object-cover object-center"
						src={Zebra}
						alt=""
						ref={(el) => {
							image4 = el;
						}}
					/>

					<div className={CardGen}>
						<h1 className={HeaderGen}>African Market Place</h1>
						<p className=" py-10 text-3xl">A simple small online marketplace for buying and selling wares </p>
						<VisibilitySensor onChange={(onChange, setIViz4)}>
							<button className={ButtonGen} onClick={() => { openNavById("Market") }}>View My Project</button>
						</VisibilitySensor>
					</div>
				</div>
			</section>
			<section >
				<div className="flex flex-col md:flex md:flex-row md:flex-no-wrap ">
					<img
						className="md:w-1/3 opacity-0 max-full relative object-cover object-center"
						src={Wall}
						alt=""
						ref={(el) => {
							image3 = el;
						}}
					/>

					<div className={CardGen}>
						<h1 className={HeaderGen}>Conway's Game of Life</h1>
						<p className="py-10 text-3xl">Emergent order from simple rules. Conway's game of life show's the marvel of cellular automatons</p>
						<VisibilitySensor onChange={(onChange, setIViz3)}>
							<button className={ButtonGen} onClick={() => { openNavById("GameOfLife") }}>View My Project</button>
						</VisibilitySensor>
					</div>
				</div>
			</section>

			<section className="flex justify-center p-10 align-middle bg-black">
				<div className="w-full max-w-lg">
					<h2 className="text-4xl text-center text-white">Contact</h2>
					{showContact ? <Contact className="" /> : null}
					<div className="flex flex-row justify-between md:z-10  md:w-full px-10 md:px-20 my-2 md:my-5">
						<a href={Resume}>
							<img classN
								className="logo" src={ResumeLogo} alt="Resume" />
						</a>
						<a href="https://www.linkedin.com/in/jacobprudent">
							<img className="logo" src={LinkedInLogo} alt="LinkedIn" />
						</a>
						<a href="https://github.com/prudentj">
							<img className="logo" src={GithubLogo} alt="GitHub" />
						</a>
						<a href="https://twitter.com/JacobPrudent">
							<img className="logo" src={TwitterLogo} alt="Twitter" />
						</a>
						<button onClick={() => { showContact ? setShowContact(false) : setShowContact(true) }}>
							<img className="logo" src={EmailLogo} alt="Email" />
						</button>

					</div>
					<a href="https://github.com/prudentj/portfolio_prime"><p>Source for this portfolio</p></a>
				</div>
			</section>
		</div >
	);
};

export default Portfolio;
