import React, {useState} from 'react';
import styled from 'styled-components';
const MenuButton = () => {
	const Menu = styled.a`
		position: relative;
		display: inline-block;
		width: 30px;
		height: 30px;
		margin: 25px;
		&:hover {
			cursor: pointer;
		}
		span {
			margin: 0 auto;
			position: relative;
			top: 12px;

			-webkit-transition-duration: 0s;
			transition-duration: 0s;
			-webkit-transition-delay: 0.2s;
			transition-delay: 0.2s;
		}
		span:before,
		span:after {
			position: absolute;
			content: '';
			-webkit-transition-property: margin, -webkit-transform;
			transition-property: margin, transform;
			-webkit-transition-duration: 0.2s;
			transition-duration: 0.2s;
			-webkit-transition-delay: 0.2s, 0s;
			transition-delay: 0.2s, 0s;
		}
		span,
		span:before,
		span:after {
			width: 30px;
			height: 6px;
			background-color: white;
			display: block;
			margin-top: 12px;
		}
		span:before {
			margin-top: -12px;

			-webkit-transition-property: margin, -webkit-transform;
			transition-property: margin, transform;
			-webkit-transition-duration: 0.2s;
			transition-duration: 0.2s;
			-webkit-transition-delay: 0.2s, 0s;
			transition-delay: 0.2s, 0s;
		}

		.toggled span {
			background-color: blue;
			-webkit-transition-delay: 0.2s;
			transition-delay: 0.2s;
		}

		.toggled span:before {
			margin-top: 0;
			-webkit-transform: rotate(45deg);
			transform: rotate(45deg);
			-webkit-transition-delay: 0s, 0.2s;
			transition-delay: 0s, 0.2s;
		}
		.toggled span:after {
			margin-top: 0;
			-webkit-transform: rotate(-45deg);
			transform: rotate(-45deg);
			-webkit-transition-delay: 0s, 0.2s;
			transition-delay: 0s, 0.2s;
		}
	`;
	return (
		<Menu>
			<span></span>
		</Menu>
	);
};
//&:hover need to add
export default MenuButton;
//example
// import styled from 'styled-components';

// export const Box = styled.div`
//   display: inline-block;
//   background: pink;
//   width: 200px;
//   height: 200px;
//   transition: transform 300ms ease-in-out;

//   &:hover {
//     transform: translate(200px, 150px) rotate(20deg)
//   }
