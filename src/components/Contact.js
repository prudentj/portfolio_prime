import React, { useState } from 'react';

const Contact = props => {
    //State
    const [username, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [message, setMessage] = useState('');

    //Form Handles changes
    const handleNameChange = el => {
        setUsername(el.target.value)
    }

    const handleEmailChange = el => {
        setUserEmail(el.target.value)
    }

    const handleMessageChange = el => {
        setMessage(el.target.value)
        //Input Validation goes here
    }

    const handelSubmit = () => {
        const templateId = "template_HzFQaO9h"
        sendFeedback(templateId, { message_html: message, from_name: username, reply_to: userEmail })
    }
    const sendFeedback = (templateId, variables) => {
        window.emailjs.send(
            'gmail', templateId,
            variables
        ).then(res => {
            console.log('Email successfully sent!')
        })
            // Handle errors here however you like, or use a React error boundary
            .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occurred:', err))
    }


    return (
        <form id={props.overlayId} className="w-full max-w-lg ease-in-out my-5">
            <p className="text-xl text-center text-white">Email: jake.prudent@gmail.com</p>
            {/* <p className="text-2xl text-center text-white my-2 py-2 border-t-2 ">or</p>
            <div className="flex flex-wrap mb-6 -mx-3">
                <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                    <label
                        className="block w-full px-3 py-2 mb-6 text-sm text-white md:w-1/2 md:mb-0"
                        htmlFor="name"
                    >
                        Name
							</label>
                    <input
                        className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Name"
                        onChange={handleNameChange}
                    />
                </div>
                <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                    <label
                        className="block w-full px-3 py-2 mb-6 text-sm text-white md:w-1/2 md:mb-0"
                        htmlFor="email"

                    >
                        Email
							</label>
                    <input
                        className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="email"
                        type="text"
                        placeholder="Email"
                        maxLength="320"
                        onChange={handleEmailChange}

                    />
                </div>
            </div>
            <div className="md:w-1/3">
                <label className="py-1 text-white" htmlFor="message">
                    Message
						</label>
            </div>
            <div className="mt-2 md:flex-1 mb:mt-0 md:px-3">
                <textarea
                    className="block w-full h-48 px-4 py-3 mb-3 leading-tight border border-gray-200 rounded appearance-none resize-none no-resize focus:outline-none focus:bg-white focus:border-gray-500"
                    rows="6"
                    onChange={handleMessageChange}
                ></textarea>
            </div>
            <button className="px-4 py-2 font-bold text-white bg-transparent border border-white rounded-full shadow focus:shadow-outline focus:outline-none hover:bg-primary hover:text-white"
                onClick={handelSubmit}
            >
                Send Message
			</button> */}
        </form>
    )
}

export default Contact