import React, { useState } from 'react';

import TwitterLogo from './icons/twitter.svg'
import GithubLogo from './icons/github.svg'
import LinkedInLogo from './icons/linkedin.svg'
import ResumeLogo from './icons/paperclip.svg'
import EmailLogo from './icons/email.svg'
import Resume from './img/Resume.pdf';

import Contact from './Contact';

const ContactNav = () => {
    const [showContact, setShowContact] = useState(false)
    return (<section className="flex justify-center p-10 align-middle bg-black">
        <div className="w-full max-w-lg">
            <h2 className="text-4xl text-center text-white">Contact</h2>
            {showContact ? <Contact className="" /> : null}
            <div className="flex flex-row justify-between md:z-10  md:w-full px-10 md:px-20 my-2 md:my-5">
                <a href={Resume}>
                    <img classN
                        className="logo" src={ResumeLogo} alt="Resume" />
                </a>
                <a href="https://www.linkedin.com/in/jacobprudent">
                    <img className="logo" src={LinkedInLogo} alt="LinkedIn" />
                </a>
                <a href="https://github.com/prudentj">
                    <img className="logo" src={GithubLogo} alt="GitHub" />
                </a>
                <a href="https://twitter.com/JacobPrudent">
                    <img className="logo" src={TwitterLogo} alt="Twitter" />
                </a>
                <button onClick={() => { showContact ? setShowContact(false) : setShowContact(true) }}>
                    <img className="logo" src={EmailLogo} alt="Email" />
                </button>

            </div>
            <a href="https://github.com/prudentj/portfolio_prime"><p>Source for this portfolio</p></a>
        </div>
    </section>)
}
export default ContactNav;