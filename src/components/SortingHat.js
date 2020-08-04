import React from 'react';
import PhonePhoto from './img/TechSortingHat.png'
const SortingHat = () => {

    const ButtonGen =
        'px-1 py-2 md:py-4 m-6 border border-white text-white bg-transparent rounded-full hover:bg-primary hover:text-white w-full md:w-1/3 lg:w-1/3 text-lg outline-none';
    /* Close when someone clicks on the "x" symbol inside the overlay */
    function closeOverlay() {
        document.getElementById("SortingHat").style.width = "0%";
        document.body.className = "overflow-x-hidden overflow-y-scroll";
    }
    return (
        <div id="SortingHat" className="h-full transBackground w-0 fixed z-20 left-0 top-0 overflow-x-hidden duration-500 flex justify-center align-center">

            {/* <!-- Button to close the overlay navigation --> */}
            <div className="max-h-screen">
                <div className="flex flex-col md:flex md:flex-row md:flex-no-wrap my-1 mx-1">
                    <button className="absolute top-0 right-0 p-5 text-6xl text-white outline-none z-30" onClick={closeOverlay}>&times;</button>
                    <a href="https://github.com/Lambda-School-Labs/sorting-hat-fe" className="w-0 lg:w-1/3 object-cover object-center bg-black">
                        <img
                            src={PhonePhoto}
                            alt="Tech Sorting Hat Questionnaire Application"
                            className="max-screen"
                        />
                    </a>


                    <div className="bg-black text-white lg:w-2/3 flex flex-col justify-center py-10 px-20 ">
                        <h1 className='text-4xl text-white bold' id="project1" >
                            Sorting Hat
						</h1>
                        <p className="py-10 text-2xl">Tech Sorting Hat is a questionnaire application for suggesting possible
                    technology fields that the user might find interesting. <br /><br />
                    Following an agile product cycle, over four weeks our team met all the objectives set out by our stakeholders.
                    Our team was comprised of several full stack engineers and  UX designers.
                    Serving primarily as one the teams frontend engineers, I assisted in the pixel perfect implementation of our UX Designer's vision.
                    I using responsive techniques I saw that the sight looked excellent on all screen sizes</p>
                        <div><strong>React</strong>&nbsp; · &nbsp;<strong>Redux</strong>&nbsp; · &nbsp;<strong>Express</strong> + <strong>Knex</strong>&nbsp; · &nbsp;<strong>NodeJS</strong> + <strong>Postgres</strong>&nbsp; · &nbsp;<strong>Jest</strong>&nbsp; · &nbsp;<strong>Cypress</strong>&nbsp; · &nbsp;<strong>Tailwind.css</strong>&nbsp; · &nbsp;<strong>AWS Amplify</strong> </div>
                        <div className="flex-row w-full justify-evenly">
                            <a href="https://www.sortinghat.tech/"
                                target="_blank"
                            >
                                <button className={ButtonGen}>Live Project</button>
                            </a>

                            <a href="https://github.com/Lambda-School-Labs/sorting-hat-fe"
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
export default SortingHat
