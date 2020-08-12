import React from 'react'
import closeOverlay from '../utilities/closeOverlay'
import ButtonGen from './ButtonGen'

const Overlay = props => {


    /* Close when someone clicks on the "x" symbol inside the overlay */

    return (
        <div id={props.overlayId} className="h-full transBackground w-0 fixed z-20 left-0 top-0 overflow-x-hidden duration-500 flex justify-center align-center">

            {/* <!-- Button to close the overlay navigation --> */}
            <div className="max-h-screen">
                <div className="flex flex-col md:flex md:flex-row md:flex-no-wrap my-1 mx-1">
                    <button className="absolute top-0 right-0 p-5 text-6xl text-white outline-none z-30" onClick={() => closeOverlay(props.overlayId)}>&times;</button>
                    <a href={props.liveProjLink} className="w-0 lg:w-1/3 max-screen object-cover object-center bg-black">
                        <img
                            src={props.photo}
                            alt="Tech Sorting Hat Questionnaire Application"
                            className="max-screen"
                        />
                    </a>


                    <div className="bg-black text-white lg:w-2/3 flex flex-col justify-center py-10 px-20">
                        <h1 className='text-4xl text-white bold' id="project1" >
                            {props.title}
                        </h1>
                        <p className="py-10 text-2xl">{props.description}</p>
                        <div>{props.techs}</div>
                        <div className="flex-row w-full justify-evenly">
                            <ButtonGen link={props.liveProjLink} />
                            <ButtonGen link={props.sourceCodeLink} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Overlay