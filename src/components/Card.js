import React from 'react';
import styled from 'styled-components';

const CardStyle = styled.div`
  width: 30%;
  padding: 32px 30px;
  border-radius: 12px;
  box-shadow: 0 18px 29px 0 rgba(132, 140, 163, 0.44);
  /* background-color: #1c2d41; */
  background-color: ${props => (props.bg === 'invert' ? '#1c2d41' : '#fff')};
  border: solid 1px rgba(155, 155, 155, 0.24);
  display: flex;
  flex-direction: column;
  color: ${props => (props.bg === 'invert' ? ' #fff' : '#1c2d41')};

  /* &.card--white {
    background-color: #fff;
    color: #1c2d41;

    p {
      color: #99a0a9;
    }


  } */
  button {
    width: 100%;
    padding: 0px;
  }

  .top {
    display: flex;
    margin-bottom: 25px;
  }

  .card__info {
    h2 {
      margin-bottom: 10px;
      font-size: 28px;
    }

    p {
      font-size: 18px;
      text-transform: capitalize;
    }
  }

  .icon {
    margin-right: 25px;
    font-size: 3em;
  }
`;

/**
 *
 * @param {string} title Card title/name
 * @param {string} bg render inverted or white card
 * @param {string} icon font-awesome icon
 */
const Card = ({ title, number, bg, children, icon, classNames }) => (
  <CardStyle bg={bg}>
    <div className={`top ${classNames}`}>
      <div className="icon">
        <i className={icon} />
      </div>
      <div className="card__info">
        <h2>{number}</h2>
        <p>{title}</p>
      </div>
    </div>
    {children}
  </CardStyle>
);

export default Card;
