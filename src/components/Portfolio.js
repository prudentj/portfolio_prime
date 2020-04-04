import React, {useRef, useEffect, useState} from 'react';
import Demo from './img/smallDemo.jpg';
import Wall from './img/whitewall.jpg';
import Lemmons from './img/lemmons.jpg';
import Bridge from './img/bridge.jpg';
import {TweenMax, Power1} from 'gsap';
import logo from './icons/logo192.png';
import VisibilitySensor from 'react-visibility-sensor';

//Visibility Sensor seems to have a conflict with GSAP Where the two fight and neither works I can place the sensor on something near by though which can help

// background: url("../images/globe.jpg");
//background-size: cover;
//background-repeat: no-repeat;
//bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded
const CardGen =
	'bg-black text-white w-2/3 flex flex-col relative justify-center px-20 border-solid border border-primary';
const ButtonGen =
	'px-1 py-4 mx-1 border border-white text-white bg-transparent rounded-full hover:bg-primary hover:text-white w-1/3 text-lg';
const HeaderGen = 'text-4xl text-white';

const Portfolio = () => {
	//Contact Form State
	const [emailVaild, setEmailVaild] = useState('');

	//State for animation
	const [iViz2, setIViz2] = useState(false);
	const [iViz3, setIViz3] = useState(false);
	const [iViz4, setIViz4] = useState(false);

	let mainHeading = useRef(null);
	let image1 = useRef(null);
	let image2 = useRef(null);
	let image3 = useRef(null);
	let image4 = useRef(null);

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
				ease: Power1.easeOut
			});
		} else {
			// TweenMax.to(imageRef, 0.8, {
			// 	opacity: 0,
			// 	//x: 50,
			// 	ease: Power1.easeOut
			// });
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
			{/*Landing Component*/}
			<section className="bg-blue">
				<div
					className="flex bg-no-repeat bg-cover"
					style={{
						background:
							"url('https://images.unsplash.com/photo-1578836537282-3171d77f8632?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80')"
					}}
				>
					<div
						className="relative flex flex-col justify-center w-1/2 h-screen px-10 text-white bg-black opacity-0"
						ref={el => {
							mainHeading = el;
						}}
					>
						<h1 className="py-2 text-6xl text-white">Jacob Prudent</h1>
						<p className="py-2 text-3xl ">
							I am a full stack developer, who loves mastering new skills and
							discovering a challenge
						</p>
						<button
							className={ButtonGen}
							onClick={() => {
								if (image2.current) {
									image2.current.scrollIntoView({
										behavior: 'smooth',
										block: 'nearest'
									});
								}
							}}
						>
							View My Project
						</button>
					</div>
				</div>
			</section>
			<section>
				<div className="flex flex-no-wrap">
					<img
						className="w-1/3 opacity-0"
						src={Bridge}
						ref={el => {
							image2 = el;
						}}
					/>

					<div className={CardGen}>
						<h1 className={HeaderGen} id="project1">
							Project 1
						</h1>
						<p className="py-2 text-xl">Great things coming Soon</p>
						<VisibilitySensor onChange={(onChange, setIViz2)}>
							<button className={ButtonGen}>View My Project</button>
						</VisibilitySensor>
					</div>
				</div>
			</section>
			<section>
				<div className="flex flex-row-reverse flex-no-wrap">
					<img
						className="w-1/3 opacity-0"
						src={Wall}
						ref={el => {
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
				<div className="flex flex-no-wrap">
					<img
						className="w-1/3 opacity-0"
						src={Lemmons}
						ref={el => {
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
				<form className="w-full max-w-lg">
					<h2 className="text-4xl text-center text-white">Message Me</h2>
					<div className="flex flex-wrap mb-6 -mx-3">
						<div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
							<label
								className="block w-full px-3 py-2 mb-2 mb-6 text-sm text-white md:w-1/2 md:mb-0"
								htmlFor="name"
							>
								Name
							</label>
							<input
								className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
								id="name"
								type="text"
								placeholder="Name"
							/>
						</div>
						<div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
							<label
								className="block w-full px-3 py-2 mb-2 mb-6 text-sm text-white md:w-1/2 md:mb-0"
								htmlFor="email"
							>
								Email
							</label>
							<input
								className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
								id="email"
								type="text"
								placeholder="Email"
							/>
						</div>
					</div>
					<div className="md:w-1/3">
						<label className="py-1 text-white" htmlFor="message">
							Message
						</label>
					</div>
					<div className="mt-2 md:flex-1 mb:mt-0 md:px-3">
						<textarea
							className="block w-full h-48 px-4 py-3 mb-3 leading-tight border border-gray-200 rounded appearance-none resize-none no-resize focus:outline-none focus:bg-white focus:border-gray-500"
							rows="6"
						></textarea>
						{/* "w-full shadow-inner p-4 border-0 my-5 "*/}
					</div>
					<button className="px-4 py-2 font-bold text-white bg-transparent border border-white rounded rounded-full shadow focus:shadow-outline focus:outline-none hover:bg-primary hover:text-white">
						Send Message
					</button>
				</form>
			</section>
		</div>
	);
};

export default Portfolio;
