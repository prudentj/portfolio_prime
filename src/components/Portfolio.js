//Libraries and Components
import React, { useRef, useEffect, useState } from 'react';
import Contact from './Contact';

//Images
import Lemmons from './img/lemmons.jpg';
import Witch from './img/witch_green_lg.jpg';
import Wall from './img/whitewall.jpg';
// import Bridge from './img/bridge.jpg';
// import Mist from './img/mist2.mp4'

//Icons
import TwitterLogo from './icons/twitter.svg'
import GithubLogo from './icons/github.svg'
import LinkedInLogo from './icons/linkedin.svg'
import ResumeLogo from './icons/paperclip.svg'
import EmailLogo from './icons/email.svg'


//Animations
import { TweenMax, Power1 } from 'gsap';
import VisibilitySensor from 'react-visibility-sensor';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { FormProvider } from 'antd/lib/form/context';

//Visibility Sensor seems to have a conflict with GSAP Where the two fight and neither works I can place the sensor on something near by though which can help

// background: url("../images/globe.jpg");
//background-size: cover;
//background-repeat: no-repeat;
//bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded
const CardGen =
	'bg-black text-white md:w-2/3 flex flex-col relative justify-center py-10 px-20 border-solid border border-primary';
const ButtonGen =
	'px-1 py-2 md:py-4 mx-1 border border-white text-white bg-transparent rounded-full hover:bg-primary hover:text-white lg:w-1/2 text-lg';
const HeaderGen = 'text-4xl text-white';

const Portfolio = () => {
	//Contact Form State
	const [emailVaild, setEmailVaild] = useState('');

	//State for animation to reveal photos
	const [iViz2, setIViz2] = useState(false);
	const [iViz3, setIViz3] = useState(false);
	const [iViz4, setIViz4] = useState(false);

	//State for rendering subcomponets
	const [showContact, setShowContact] = useState(false)

	//Functions for rendering subcomponents
	const toggleContact = () => {
		if (showContact) {
			return
		}
	}
	let mainHeading = useRef(null);
	let image1 = useRef(null);
	let image2 = useRef(null);
	let image3 = useRef(null);
	let image4 = useRef(null);

	const scrollTo = () => {
		scroller.scrollTo('')
	}

	//Functions for animation
	function onChange(isVisible, callback) {
		console.log(isVisible);
		console.log('Element is now %s', isVisible ? 'visible' : 'hidden');
		callback(isVisible);
	}

	function gsaper(state, imageRef) {
		if (state) {
			console.log(imageRef);
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
		<div className="bg-primary">
			<section className="sm:flex-col md:flex-row-reverse md:h-screen md:relative">
				<img
					className="md:z-0 max-full relative object-cover object-center md:h-screen md:max-h-screen lg:absolute lg:right-0"
					src="https://images.unsplash.com/photo-1578836537282-3171d77f8632?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
					ref={(el) => {
						image2 = el;
					}}
					alt="Mountain in the clouds"
				/>
				{/* <video id="background-video" loop autoPlay className="md:z-0 max-full relative object-cover object-center md:h-screen md:max-h-screen lg:absolute lg:right-0">

					<source src={Mist} type="video/mp4" />
    				Your browser does not support the video tag.
				</video> */}
				<div
					className="py-10 md:absolute md:top-0 md:left-0 flex flex-col justify-center md:z-10  md:w-1/2 md:h-screen px-10 md:px-20 text-white bg-black opacity-0"
					ref={(el) => {
						mainHeading = el;
					}}
				>
					<h1 className="py-2 text-4xl md:text-6xl text-white">
						Jacob Prudent
					</h1>
					<p className="py-2 text-3xl ">
						I am a full stack developer, who loves mastering new skills and
						discovering a challenge
					</p>

					<button
						className="px-1 py-2 md:py-4 mx-1 border border-white text-white bg-transparent rounded-full hover:bg-primary hover:text-white lg:w-1/2 text-lg"
					//I need to write a script to scroll to the first project
					// onClick={}
					>
						View My Projects
					</button>


				</div>
			</section>
			<section className="bg-primary">
				<div className="flex flex-col md:flex md:flex-row md:flex-no-wrap">
					<img
						className="md:w-1/3 opacity-0 max-full relative object-cover object-center"
						src={Witch}
						ref={(el) => {
							image2 = el;
						}}
					/>

					<div className="bg-black text-white md:w-2/3 flex flex-col relative justify-center py-10 px-20 border-solid border border-primary">
						<h1 className={HeaderGen} id="project1">
							Sorting Hat
						</h1>
						<p className="py-2 text-xl">Lambda Labs project where as a team we met with a stakeholder and built a tech quiz that met his expectations</p>
						<VisibilitySensor onChange={(onChange, setIViz2)}>
							<button className={ButtonGen}>View My Project</button>
						</VisibilitySensor>

					</div>
				</div>
			</section>
			<section>
				<div className="flex flex-col md:flex md:flex-row-reverse md:flex-no-wrap">
					<img
						className="md:w-1/3 opacity-0 max-full relative object-cover object-center"
						src={Wall}
						ref={(el) => {
							image3 = el;
						}}
					/>

					<div className={CardGen}>
						<h1 className={HeaderGen}>Project 2</h1>
						<p className="text-xl">Good things coming Soon</p>
						<VisibilitySensor onChange={(onChange, setIViz3)}>
							<button className={ButtonGen}>View My Project</button>
						</VisibilitySensor>
					</div>
				</div>
			</section>
			<section>
				<div className="flex flex-col md:flex md:flex-row md:flex-no-wrap">
					<img
						className="md:w-1/3 opacity-0 max-full relative object-cover object-center"
						src={Lemmons}
						ref={(el) => {
							image4 = el;
						}}
					/>

					<div className={CardGen}>
						<h1 className={HeaderGen}>Project 3</h1>
						<p className="text-xl">Good things coming soon</p>
						<VisibilitySensor onChange={(onChange, setIViz4)}>
							<button className={ButtonGen}>View My Project</button>
						</VisibilitySensor>
					</div>
				</div>
			</section>
			<section className="flex justify-center p-10 align-middle bg-black">
				<div className="w-full max-w-lg">
					<h2 className="text-4xl text-center text-white">Contact</h2>
					{showContact ? <Contact className="" /> : null}
					<div className="flex flex-row justify-center md:z-10  md:w-full px-10 md:px-20 md:my-5">

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
						{/* <a href="https://www.linkedin.com/in/jacob-prudent-a043a389/">
							<img classN
							ame="logo" src={ResumeLogo} alt="Resume" />
						</a> */}
					</div>

				</div>
			</section>
		</div >
	);
};

export default Portfolio;
