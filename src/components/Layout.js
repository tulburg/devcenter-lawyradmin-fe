import styled from 'styled-components';

export const Horizontal = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SendInvite = styled.div` display: flex; flex-direction: column; align-items: center;
	h1 { font-size: 48px; font-weight: bold; font-style: normal; font-stretch: normal; line-height: normal; letter-spacing: normal; text-align: left; color: #9b9b9b; margin-bottom: 20px; }
	h4 { font-size: 18px; font-weight: bold; letter-spacing: 1.3px; color: #000000; margin-bottom: 20px; &.uppercase { text-transform: uppercase; } }
	.subtext { opacity: 0.59; font-size: 14px; color: #4a4a4a; }
	.textbox { width: 456px; height: 63px; border-radius: 5px; background-color: #f5f6fa; border: solid 1px #979797; font-size: 18px; color: #000; padding-left: 15px; margin-top: 25px; margin-bottom: 35px; }
	button { width: 143px; height: 55px; border-radius: 9px; background-color: #50e3c2; border: 0; font-size: 18px; font-weight: bold; color: #1c2d41; }
	.input-wrap { position: relative;
		 &__btn { width: 40px; height: 40px; border-radius: 100%; border: 0; position: absolute; right: 12px; top: 38px; background-color: #50e3c2; color: #fff; display: flex; justify-content: center; align-items: center; font-size: 24px;
		 &:hover { cursor: pointer; } } 
	}
	.invite-sent { font-size: 14px; color: #000000; }
`;
