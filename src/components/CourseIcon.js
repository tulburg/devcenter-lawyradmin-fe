import React from "react";
import styled from "styled-components";
/**
 *
 * @param {string} course_name name/title of course
 */
const CourseIcon = ({ course_title }) => (
	<CourseIconStyle>
		<div className="icon">
			<i className="fas fa-users" />
		</div>
		<p className="title">{course_title}</p>
	</CourseIconStyle>
);

const CourseIconStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	.icon {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		font-size: 40px;
		height: 153px;
		width: 153px;
		border-radius: 100px;
		background-color: #1c2d41;
		margin-bottom: 23px;
	}
	.title {
		font-weight: bold;
	}
`;

export default CourseIcon;
