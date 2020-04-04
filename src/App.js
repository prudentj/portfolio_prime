import React from 'react';
import './styles/app.css';
import Tutorial from './components/Tutorial';
import Header from './components/Header';
import Landing from './components/Landing';
import Portfolio from './components/Portfolio';
function App() {
	return (
		<>
			<Portfolio />
			{/* <Tutorial /> */}
			{/* <div className="max-h-screen">
				<Header />
				<Landing />
			</div> */}

			{/* <section className="flex flex-wrap w-3/6 m-auto mt-20 bg-primary">
				<div className="flex flex-wrap">
					<div className="relative w-full p-10 rounded shadow mb- bg-gray">
						<span className="absolute text-6xl italic text-gray-300 right-10">
							01
						</span>
						<h2 className="absolute relative z-10 text-2xl text-gray-900">
							Prudent
						</h2>
						<hr className="block h-0 mt-5 mb-6 border-t-2 border-red-500 w-" />
						<p className="text-gray-700">
							Beautiful is better than ugly. Explicit is better than implicit.
							Simple is better than complex. Complex is better than complicated.
							Flat is better than nested. Sparse is better than dense.
							Readability counts. Special cases aren't special enough to break
							the rules. Although practicality beats purity. Errors should never
							pass silently. Unless explicitly silenced. In the face of
							ambiguity, refuse the temptation to guess. There should be one--
							and preferably only one --obvious way to do it. Although that way
							may not be obvious at first unless you're Dutch. Now is better
							than never. Although never is often better than *right* now. If
							the implementation is hard to explain, it's a bad idea. If the
							implementation is easy to explain, it may be a good idea.
							Namespaces are one honking great idea -- let's do more of those!
						</p>
					</div>
				</div>
			</section> */}
		</>
	);
}

export default App;
