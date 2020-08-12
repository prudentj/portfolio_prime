import React, { useRef, useEffect, useState } from 'react'
import VisibilitySensor from 'react-visibility-sensor';
import openOverlay from '../utilities/openOverlay';
import gsaper from '../utilities/gsaper';

const ProjectCard = (props) => {
    const CardGen =
        'bg-black text-white md:w-2/3 flex flex-col relative justify-center py-10 px-10 lg:px-20 ';
    const HeaderGen = 'text-4xl text-white';
    const ButtonGen = 'px-1 py-2 md:py-4 mx-1 border border-white text-white bg-transparent rounded-full hover:bg-primary hover:text-white lg:w-1/2 text-lg outline-none';
    const flexDir = props.picOnLeft ? "md:flex-row-reverse " : "md:flex-row "
    const [iViz, setIViz] = useState(false);
    let imageRef = useRef(null)
    useEffect(() => {
        gsaper(iViz, imageRef)
    })
    function onChange(isVisible, callback) {
        callback(isVisible);
    }
    return (
        <div className={flexDir + "flex flex-col md:flex md:flex-no-wrap "}>
            <img
                className="md:w-1/3 opacity-0 max-full relative object-cover object-center"
                src={props.pic}
                alt={props.picAlt}
                ref={(el) => {
                    imageRef = el;
                }}
            />

            <div className={CardGen}>
                <h1 className={HeaderGen}> {props.cardTitle}</h1>
                <p className="py-10 text-3xl">{props.cardDesc}</p>
                <VisibilitySensor onChange={(onChange, setIViz)}>
                    <button className={ButtonGen} onClick={() => { openOverlay(props.overlayName) }}>View My Project</button>
                </VisibilitySensor>
            </div>
        </div>
    )
}
export default ProjectCard