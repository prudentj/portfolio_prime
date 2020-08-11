import React from 'react';
import Photo from './img/zebra.jpg'
import closeOverlay from '../utilities/closeOverlay'
const Market = () => {

    const ButtonGen =
        'px-1 py-2 md:py-4 m-6 border border-white text-white bg-transparent rounded-full hover:bg-primary hover:text-white w-full md:w-1/3 lg:w-1/3 text-lg outline-none';
    /* Close when someone clicks on the "x" symbol inside the overlay */

    return (
        <div id="Market" className="h-full transBackground w-0 fixed z-20 left-0 top-0 overflow-x-hidden duration-500 flex justify-center align-center">

            {/* <!-- Button to close the overlay navigation --> */}
            <div className="max-h-screen">
                <div className="flex flex-col md:flex md:flex-row md:flex-no-wrap my-1 mx-1">
                    <button className="absolute top-0 right-0 p-5 text-6xl text-white outline-none z-30" onClick={() => closeOverlay("Market")}>&times;</button>
                    <a href="https://github.com/Lambda-School-Labs/sorting-hat-fe" className="w-0 lg:w-1/3 object-center bg-black">
                        <img
                            src={Photo}
                            alt="Tech Sorting Hat Questionnaire Application"
                            className="max-screen"
                        />
                    </a>


                    <div className="bg-black text-white lg:w-2/3 flex flex-col justify-center py-10 px-20">
                        <h1 className='text-4xl text-white bold' id="project1" >
                            Africa Connected
						</h1>
                        <p className="py-10 text-2xl"> African Connected was a Lambda School build week project, where a team of developers in different stages of their Lambda School Education were tasked to build an application<br /><br />
                    I served as the senior React developer on this application, in charge of state, API calls, and assisting the junior developer. It was my first chance of trying third party components, which I thoroughly enjoyed.</p>
                        <div><strong>React</strong>&nbsp; · &nbsp;<strong>Context State Management</strong>&nbsp; · &nbsp;<strong>MaterialUI</strong> </div>
                        <div className="flex-row w-full justify-evenly">
                            <a href="https://front-end-mu.now.sh/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <button className={ButtonGen}>Live Project</button>
                            </a>

                            <a href="https://github.com/African-Market-Place-2/front-end"
                                target="_blank"
                                rel="noopener noreferrer">

                                <button className={ButtonGen}>Source Code</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Market
