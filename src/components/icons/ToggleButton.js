import React from 'react';
import styled from 'styled-components';
//THIS CODE WAS TAKEN ONLINE FROM SOMEONE ELSE AND IS USED FOR REFERENCE
const ToggleButton = () => {
	return (
		<div>
			<CheckBoxWrapper>
				<CheckBox id="checkbox" type="checkbox" />
				<CheckBoxLabel htmlFor="checkbox" />
			</CheckBoxWrapper>
		</div>
	);
};

const CheckBoxWrapper = styled.div`
	position: relative;
`;
const CheckBoxLabel = styled.label`
	position: absolute;
	top: 0;
	left: 0;
	width: 42px;
	height: 26px;
	border-radius: 15px;
	background: #bebebe;
	cursor: pointer;
	&::after {
		content: '';
		display: block;
		border-radius: 50%;
		width: 18px;
		height: 18px;
		margin: 3px;
		background: #ffffff;
		box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
		transition: 0.2s;
	}
`;
const CheckBox = styled.input`
	opacity: 0;
	z-index: 1;
	border-radius: 15px;
	width: 42px;
	height: 26px;
	&:checked + ${CheckBoxLabel} {
		background: #4fbe79;
		&::after {
			content: '';
			display: block;
			border-radius: 50%;
			width: 18px;
			height: 18px;
			margin-left: 21px;
			transition: 0.2s;
		}
	}
`;

export default ToggleButton;
