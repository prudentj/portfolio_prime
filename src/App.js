import React from 'react';
import './styles/app.css';
function App() {
	return (
		<section className="w-3/6 m-auto flex flex-wrap mt-20">
			<div className="flex flex-wrap">
				<div className="w-full mb- p-10 bg-gray relative rounded shadow">
					<span className="text-gray-300 text-6xl absolute italic right-10">
						01
					</span>
					<h2 className="z-10 relative text-2xl text-gray-900 absolute">
						Prudent
					</h2>
					<hr className="block mb-6 mt-5 w- border-red-500 h-0 border-t-2" />
					<p className="text-gray-700">
						Beautiful is better than ugly. Explicit is better than implicit.
						Simple is better than complex. Complex is better than complicated.
						Flat is better than nested. Sparse is better than dense. Readability
						counts. Special cases aren't special enough to break the rules.
						Although practicality beats purity. Errors should never pass
						silently. Unless explicitly silenced. In the face of ambiguity,
						refuse the temptation to guess. There should be one-- and preferably
						only one --obvious way to do it. Although that way may not be
						obvious at first unless you're Dutch. Now is better than never.
						Although never is often better than *right* now. If the
						implementation is hard to explain, it's a bad idea. If the
						implementation is easy to explain, it may be a good idea. Namespaces
						are one honking great idea -- let's do more of those!
					</p>
				</div>
			</div>
		</section>
	);
}

export default App;
