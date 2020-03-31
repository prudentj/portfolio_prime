import React from 'react';
import Demo from './img/smallDemo.jpg';
import Virus from './img/virusArt.jpg';
import Hands from './img/hands.jpg';
const Tutorial = () => {
	return (
		<section className="bg-blue-700">
			{/*Navbar*/}
			<nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
				<div className="flex items-center flex-shrink-0 text-white mr-6">
					<span className="font-bold text-xl">Doctor Give Me the News</span>
				</div>
				<div className="text-sm sm:flex-grow">
					<a
						href="#"
						className="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4"
					>
						CDC
					</a>
					<a
						href="#"
						className="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4"
					>
						Your Mother
					</a>
					<a
						href="#"
						className="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4"
					>
						Soup
					</a>
				</div>
				<div>
					<a
						href="#"
						className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 md:mt-0"
					>
						{' '}
						Quarantine{' '}
					</a>
				</div>
			</nav>
			<div className="container px-2 mx-auto">
				<div className="flex-row p-2">
					<button className="px-4 py-2 mx-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-400">
						Find Friends
					</button>
					<button className="px-4 py-2 mx-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-400">
						Social Distancing
					</button>
				</div>

				{/* Alert Component*/}
				<div
					className="relative px-4 py-3 my-5 text-red-700 bg-red-100 border border-red-400 rounded"
					role="alert"
				>
					<strong className="font-bold">Alert!</strong>
					<span className="block sm:inline"> Please Stay Alert!</span>
				</div>

				{/*Card Component */}
				<div className="flex max-w-sm p-6 mx-auto bg-white rounded-lg shadow-xl">
					<div className="flex-shrink-0">
						<img src={Demo} alt="" className="w-12 h-12"></img>
					</div>
					<div className="pt-1 ml-6">
						<h4 className="text-xl text-gray-900">Because Art?</h4>
						<p className="text-base text-gray-600">How great thou art!</p>
					</div>
				</div>
				{/*Card Column*/}
				<div className="container mt-5">
					{/* Flex on medium screens and higher*/}
					<div className="md:flex">
						<div className="flex-1 text-gray-700 text-center bg-gray-400 px-5 py-5 m-2 rounded">
							<div className="lg:flex lg:items-center">
								<div className="lg:flex-shrink-0">
									<img src={Virus} alt="Pandemic Love" className="max-w-sm" />
								</div>
								<div className="mt-4 lg:mt-0 lg:ml-6">
									<div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">
										Pandemic Romance
									</div>
									<a
										href="#"
										className="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline"
									>
										Love finds a way!
									</a>
								</div>
							</div>
						</div>
						<div className="flex-1 text-gray-700 text-center bg-gray-400 px-5 py-5 m-2 rounded">
							<div className="lg:flex lg:items-center">
								<div className="lg:flex-shrink-0">
									<img src={Hands} alt="Wash your Hands" className="max-w-sm" />
								</div>
								<div className="mt-4 lg:mt-0 lg:ml-6">
									<div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">
										Wash your Hands
									</div>
									<a
										href="#"
										className="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline"
									>
										Cleanliness is next to Godliness!
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Tutorial;
