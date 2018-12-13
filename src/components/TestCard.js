import React from "react";
import styled from "styled-components";

const TestCard = ({ start_time, test, year, participants }) => (
	<TestCardStyle>
		<div className="top">
			<span className="top-header">hosted by</span>
			<div className="inner-wrap">
				<div className="avatar">UO</div>
				<p className="user-details">
					<span className="name">Name Username</span>
					<span className="username">@username</span>
				</p>
			</div>
		</div>
		<div className="bottom">
			<div className="item">
				<span className="header">Started</span>
				<p>{start_time}</p>
			</div>
			<div className="item">
				<span className="header">Test</span>
				<p>{test}</p>
			</div>
			<div className="item">
				<span className="header">Year</span>
				<p>{year}</p>
			</div>
			{participants && (
				<div className="item">
					<span className="header">participants</span>
					<p>
						{participants} <a href="/">View All</a>
					</p>
				</div>
			)}
		</div>
	</TestCardStyle>
);

const TestCardStyle = styled.div`
    border-radius: 8px;
    box-shadow: 0 18px 29px 0 rgba(132, 140, 163, 0.17);
    background-color: #ffffff;
    border: solid 1px rgba(155, 155, 155, 0.15);
    width: 30%;
    margin-bottom: 15px;
  
    .top {
      border-bottom: 1px solid #d5d5d5;
      padding: 15px;
      .top-header {
        color: #9b9b9b;
        text-transform: uppercase;
        font-size: 12px;
      }
      .avatar {
        background: #d8d8d8;
        height: 57px;
        width: 57px;
        border-radius: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        margin-right: 15px;
      }
  
      .inner-wrap {
        display: flex;
        align-items: center;
        padding: 15px 0;
      }
  
      .user-details {
        display: flex;
        flex-direction: column;
        color: #1c2d41;
  
        .name {
          font-size: 18px;
          font-weight: bold;
        }
        .username {
          font-size: 12px;
        }
      }
    }
  
    .bottom {
      padding: 15px;
      padding-top: 20px
      padding-bottom: 0;
      display: flex;
      flex-wrap: wrap;
  
      .item {
        width: 50%;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
  
        .header {
          color: #9b9b9b;
          text-transform: uppercase;
          font-size: 12px;
          margin-bottom: 5px;
        }
  
        p {
          color: #1c2d41;
          font-size: 18px;
        }
  
      }
  
      a {
        color: #f5a623;
        font-size: 12px;
      }
    }
  `;

export default TestCard;
