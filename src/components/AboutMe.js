import React from 'react';
import Photo from './img/ProfilePhoto.png';
import closeOverlay from '../utilities/closeOverlay';
import Overlay from './Overlay';
const AboutMe = () => {
    return (
        <Overlay
            overlayId="AboutMe"
            photo={Photo}
            photoAltText="Photo of a mid 20s guy grinning ear to ear, ready to get to work."
            liveProjLink={""}
            sourceCodeLink={"https://github.com/prudentj/portfolio_prime"}
            title={"About Me"}
            description={<> I am a web developer. I am always looking for an excuse to pick up a new framework or language. Recently I have been working on this portfolio.
            I strive to use responsive techniques to make my work excellent on all screen sizes. Below are some technologies I am familiar with.
                <br /><br /> I've built this portfolio using React, with custom components built with Tailwind.</>}
            techs={<><strong>Javascript</strong>&nbsp; · &nbsp;<strong>NodeJS</strong>&nbsp; · &nbsp;<strong>React ❤️</strong> &nbsp; · &nbsp; <strong>Knex</strong>&nbsp; · &nbsp; <strong>SQLite3</strong>&nbsp; · &nbsp;<strong>Jest</strong>&nbsp; · &nbsp;<strong>HTML/CSS</strong>&nbsp; · &nbsp;<strong>Tailwind ❤️</strong>&nbsp; · &nbsp;<strong>LESS</strong>&nbsp; · &nbsp;<strong>UseContext</strong>&nbsp; · &nbsp;<strong>Redux</strong>&nbsp; · &nbsp;<strong>Firebase</strong>&nbsp; ·&nbsp;<strong>Material-UI</strong>&nbsp; · &nbsp;<strong>Git</strong>&nbsp; · &nbsp;<strong>Express</strong>&nbsp; · &nbsp;<strong>Firebase</strong> ·  &nbsp;<strong>AWS Amplify</strong> · &nbsp;<strong>Heroku</strong>&nbsp;</>}
            noLiveProj={true}
        />
    )
}
export default AboutMe