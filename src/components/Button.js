import React from "react";
import styled from "styled-components";
/**
 * @param {string} bg background color of button
 * @param {function} onClick handle when button clicked
 * @param {string} text button text
 * @param {string} color button text color
 */
const Button = ({ bg, onClick, text, color }) => (
	<ButtonStyle color={color} onClick={onClick} bg={bg}>
		{text}
	</ButtonStyle>
);

const ButtonStyle = styled.button`
	height: 50px;
	border-radius: 8px;
	font-weight: bold;
	font-size: 16px;
	background-color: ${props => (props.bg ? props.bg : "#fff")};
	color: ${props => (props.color ? props.color : "#fff")};
	text-transform: capitalize;
	border: 0;
	&:hover {
		cursor: pointer;
	}
`;

export default Button;
