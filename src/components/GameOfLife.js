import React from 'react';
import Photo from './img/Heart2.png'
const GameOfLife = () => {

    const ButtonGen =
        'px-1 py-2 md:py-4 m-6 border border-white text-white bg-transparent rounded-full hover:bg-primary hover:text-white w-full md:w-1/3 lg:w-1/3 text-lg outline-none';
    /* Close when someone clicks on the "x" symbol inside the overlay */
    function closeOverlay() {
        document.getElementById("GameOfLife").style.width = "0%";
        document.body.className = "overflow-x-hidden overflow-y-scroll";
    }
    return (
        <div id="GameOfLife" className="h-full transBackground w-0 fixed z-20 left-0 top-0 overflow-x-hidden duration-500 flex justify-center align-center">

            {/* <!-- Button to close the overlay navigation --> */}
            <div className="max-h-screen">
                <div className="flex flex-col md:flex md:flex-row md:flex-no-wrap my-1 mx-1">
                    <button className="absolute top-0 right-0 p-5 text-6xl text-white outline-none z-30" onClick={closeOverlay}>&times;</button>
                    <a href="https://github.com/Lambda-School-Labs/sorting-hat-fe" className="w-0 lg:w-1/3 max-screen object-cover object-center bg-black">
                        <img
                            src={Photo}
                            alt="Tech Sorting Hat Questionnaire Application"
                            className="max-screen"
                        />
                    </a>


                    <div className="bg-black text-white lg:w-2/3 flex flex-col justify-center py-10 px-20">
                        <h1 className='text-4xl text-white bold' id="project1" >
                            Game of Life
						</h1>
                        <p className="py-10 text-2xl">Conway's Game of Life, a simulation made of very simple rules, exemplifies how very complex systems emerge from simple rule sets<br /><br />
                    Built for a Lambda School Computer Science build week, this project allowed me to practice writing a simple algorithm to meet an end goal. This is a desktop only application.</p>
                        <div><strong>React</strong>&nbsp; · &nbsp;<strong>Styled Components</strong>&nbsp; </div>
                        <div className="flex-row w-full justify-evenly">
                            <a href="https://conway-game-of-life.now.sh/"
                                target="_blank"
                            >
                                <button className={ButtonGen}>Live Project</button>
                            </a>

                            <a href="https://github.com/prudentj/conway_game_of_life"
                                target="_blank">
                                <button className={ButtonGen}>Source Code</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default GameOfLife