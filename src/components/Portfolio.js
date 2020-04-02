import React from 'react';
import Demo from './img/smallDemo.jpg';
import Virus from './img/virusArt.jpg';
import Hands from './img/hands.jpg';
import Windmills from './img/windmills.jpg';
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
	return (
		<div>
			{/*Landing Component*/}
			<section
				className="flex bg-no-repeat bg-cover"
				style={{
					background:
						"url('https://images.unsplash.com/photo-1578836537282-3171d77f8632?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80')"
				}}
			>
				<div className="relative flex flex-col justify-center w-1/2 h-screen px-10 text-white bg-black">
					<h1 className="py-2 text-6xl text-white">Jacob Prudent</h1>
					<p className="py-2 text-3xl">
						I am a full stack developer, who loves mastering new skills and
						discovering a challenge
					</p>
					<button className={ButtonGen}>View My Project</button>
				</div>
			</section>
			<section>
				<div className="flex flex-no-wrap">
					<img
						className="w-1/3"
						src="https://images.unsplash.com/photo-1578836537282-3171d77f8632?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
					/>
					<div className={CardGen}>
						<h1 className={HeaderGen}>Project 1</h1>
						<p className="py-2 text-xl">Made with Love</p>
						<button className={ButtonGen}>View My Project</button>
					</div>
				</div>
			</section>
			<section>
				<div className="flex flex-row-reverse flex-no-wrap">
					<img
						className="w-1/3"
						src="https://images.unsplash.com/photo-1578836537282-3171d77f8632?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
					/>
					<div className={CardGen}>
						<h1 className={HeaderGen}>Project 2</h1>
						<p className="text-xl">Made with Malice</p>
						<button className={ButtonGen}>View My Project</button>
					</div>
				</div>
			</section>
			<section>
				<div className="flex flex-no-wrap">
					<img
						className="w-1/3"
						src="https://images.unsplash.com/photo-1578836537282-3171d77f8632?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
					/>
					<div className={CardGen}>
						<h1 className={HeaderGen}>Project 3</h1>
						<p className="text-xl">Made with Boredom</p>
						<button className={ButtonGen}>View My Project</button>
					</div>
				</div>
			</section>
			<section className="flex flex-col justify-center px-20 align-middle bg-black border border-solid border-primary">
				<div className="flex-col">
					<h2 className={HeaderGen}>Keep in Touch</h2>
					<form className="px-8 pt-6 pb-8 mb-4 text-white bg-black rounded shadow-md">
						<div className="flex justify-around mb-4">
							<div className="flex flex-col">
								<label
									className="block px-3 py-2 mb-2 text-sm font-bold"
									for="name"
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
							<div className="flex flex-col">
								<label
									className="block px-3 py-2 mb-2 text-sm font-bold"
									for="email"
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
						<div class="md:w-1/3">
							<legend class=" tracking-wide">Message</legend>
						</div>
						<div class="md:flex-1 mt-2 mb:mt-0 md:px-3">
							<textarea
								class="w-full shadow-inner p-4 border-0"
								rows="6"
							></textarea>
						</div>
					</form>
					<button className={ButtonGen}>Send Message</button>
				</div>
			</section>
		</div>
	);
};

export default Portfolio;
