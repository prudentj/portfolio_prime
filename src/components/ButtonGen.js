import React from 'react';

const ButtonGen = props => {
    const ButtonGenStyle = 'px-1 py-2 md:py-4 m-6 border border-white text-white bg-transparent rounded-full hover:bg-primary hover:text-white w-full md:w-1/3 lg:w-1/3 text-lg outline-none';
    return (
        <a href={props.link}
            target="_blank"
            rel="noopener noreferrer">
            <button className={ButtonGenStyle}>Source Code</button>
        </a>
    )
}
export default ButtonGen;
