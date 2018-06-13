import styled from 'styled-components';

export const Horizontal = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Content = styled.div`
  background-color: #f6f6f6;
  display: flex;
  justify-content: space-between;
  padding: 78px 94px;
  height: calc(100% - 80px);
  position: relative;
  top: 80px;

  .navigation {
    width: 17.5%;
  }

  .main-section {
    width: 75%;
	margin-left: 25%;
    .main-section__header {
      margin-bottom: 10px;
    }

    .main-section__sub-header {
      margin-bottom: 25px;
      color: #9b9b9b;
      font-size: 16px;
    }

    .card-wrap {
      display: flex;
      justify-content: space-between;
    }

    .main-section__separator {
      opacity: 0.2;
      border-bottom: solid 1px #979797;
      margin-top: 62px;
      margin-bottom: 42px;
    }

    .quick-links {
      width: 30%;
      display: flex;
      flex-direction: column;
      padding: 10px 0;
      justify-content: space-around;

      &__header {
        color: red;
        text-transform: uppercase;
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 2.3px;
        color: #9b9b9b;
      }

      &__link {
        font-size: 14px;
        font-weight: bold;
        line-height: 1.22;
        color: #1c2d41;
        margin-top: 15px;

        span:first-child {
          margin-right: 10px;
        }
      }
    }

    .invite-users {
      display: flex;
      flex-direction: column;
      align-items: center;

      &__header {
        margin-bottom: 34px;
        font-size: 24px;
      }

      &__input-wrap {
        position: relative;

        input {
          width: 487px;
          height: 68px;
          border-radius: 9px;
          box-shadow: 0 8px 17px 0 rgba(153, 160, 169, 0.23);
          background-color: #ffffff;
          border: solid 1px rgba(179, 179, 179, 0.3);
          font-size: 20px;
          padding-left: 40px;
          font-family: inherit;
        }

        button {
          height: 53px;
          border: 0;
          border-radius: 9px;
          background-color: #50e3c2;
          position: absolute;
          right: 8px;
          top: 8px;
          font-size: 18px;
          font-weight: bold;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #1c2d41;
          padding-right: 15px;
          padding-left: 15px;
        }
      }

      &__link {
        margin-top: 25px;

        a {
          font-size: 12px;
          font-weight: bold;
          letter-spacing: 2px;
          color: #1c2d41;
        }
      }
    }
  }
`;

export const SendInvite = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 48px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #9b9b9b;
    margin-bottom: 20px;
  }

  h4 {
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 1.3px;
    color: #000000;
    margin-bottom: 20px;

    &.uppercase {
      text-transform: uppercase;
    }
  }

  .subtext {
    opacity: 0.59;
    font-size: 14px;
    color: #4a4a4a;
  }

  .textbox {
    width: 456px;
    height: 63px;
    border-radius: 5px;
    background-color: #f5f6fa;
    border: solid 1px #979797;
    font-size: 18px;
    color: #9b9b9b;
    padding-left: 15px;
    margin-top: 25px;
    margin-bottom: 35px;
  }

  button {
    width: 143px;
    height: 55px;
    border-radius: 9px;
    background-color: #50e3c2;
    border: 0;
    font-size: 18px;
    font-weight: bold;
    color: #1c2d41;
  }

  .input-wrap {
    position: relative;

    &__btn {
      width: 40px;
      height: 40px;
      border-radius: 100%;
      border: 0;
      position: absolute;
      right: 12px;
      top: 38px;
      background-color: #50e3c2;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .invite-sent {
    font-size: 14px;
    color: #000000;
  }
`;
