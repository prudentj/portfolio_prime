import React, { useRef } from 'react';
import PhonePhoto from './img/TechSortingHat.png'
const AboutMe = () => {

    const ButtonGen =
        'px-1 py-2 md:py-4 m-6 border border-white text-white bg-transparent rounded-full hover:bg-primary hover:text-white w-full md:w-1/3 lg:w-1/3 text-lg outline-none';
    /* Close when someone clicks on the "x" symbol inside the overlay */
    let mainHeading = useRef(null);
    let image2 = useRef(null);
    function closeOverlay() {
        document.getElementById("AboutMe").style.width = "0%";
        document.body.className = "overflow-x-hidden overflow-y-scroll";
    }
    return (
        <div id="AboutMe" className="h-full transBackground w-0 fixed z-20 left-0 top-0 overflow-x-hidden duration-500 flex justify-center align-center">

            {/* <!-- Button to close the overlay navigation --> */}
            <div className="max-h-screen">
                <div className="flex flex-col md:flex md:flex-row md:flex-no-wrap my-1 mx-1">
                    <button className="absolute top-0 right-0 p-5 text-6xl text-white outline-none z-30" onClick={closeOverlay}>&times;</button>
                    <a href="https://github.com/Lambda-School-Labs/sorting-hat-fe" className="w-0 lg:w-1/2 object-cover object-center bg-black">
                        <img
                            src={PhonePhoto}
                            alt="Tech Sorting Hat Questionnaire Application"
                            className="max-screen"
                        />
                    </a>


                    <div className="bg-black text-white lg:w-2/3 flex flex-col justify-center py-10 px-20 ">
                        <h1 className='text-4xl text-white bold' id="project1" >
                            About Me
						</h1>
                        <p className="py-10 text-2xl"> I am a web developer who loves working in Javascript and Python.
                        I am always looking for an excuse to pick up a new framework or language. Recently I have been working on this portfolio,
                        which is built using Tailwind and React. I strive to use responsive techniques to make my work excellent on all screen sizes</p>
                        <div><strong>Javascript</strong>&nbsp; · &nbsp;<strong>NodeJS</strong>&nbsp;
                        · &nbsp;<strong>React</strong> &nbsp; ·  &nbsp; <strong>Knex</strong>&nbsp;
                        · &nbsp; <strong>SQLite3</strong>&nbsp;
                        · &nbsp;<strong>Jest</strong>&nbsp; · &nbsp;<strong>HTML/CSS</strong>&nbsp;
                        · &nbsp;<strong>Tailwind.css</strong>&nbsp;
                        · &nbsp;<strong>LESS</strong>&nbsp; · &nbsp;<strong> Global State Management</strong>&nbsp;
                        · &nbsp;<strong>Material-UI</strong>&nbsp; · &nbsp;<strong>Git</strong>&nbsp;
                        · &nbsp;<strong>Express</strong>&nbsp;
                        · &nbsp;<strong>AWS Amplify</strong> · &nbsp;<strong>Heroku</strong>&nbsp; </div>
                        <div className="flex-row w-full justify-evenly">
                            <a href="https://www.sortinghat.tech/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <button className={ButtonGen}>Live Project</button>
                            </a>

                            <a href="https://github.com/Lambda-School-Labs/sorting-hat-fe"
                                target="_blank"
                                rel="noopener noreferrer">
                                <button className={ButtonGen}>Source Code</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}
export default AboutMe