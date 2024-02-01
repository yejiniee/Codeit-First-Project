import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import messageIcon from '../../assets/Messages.svg';
import messageIconDark from '../../assets/Messages-dark.svg';
import Noquestion from '../../assets/noquestion.svg';

export default function NoQuestionFeed() {
  const { mode } = useContext(ThemeContext);
  return (
    <NoQuestionWapper>
      <NoQuestionBox>
        <NoQuestionText>
          <img
            src={mode === 'light' ? messageIcon : messageIconDark}
            alt="메세지"
          />
          <p>아직 질문이 없습니다</p>
        </NoQuestionText>
        <img src={Noquestion} alt="문서사진" />
      </NoQuestionBox>
    </NoQuestionWapper>
  );
}

const NoQuestionWapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const NoQuestionBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 716px;
  height: 330px;
  padding: 16px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colorBrown20};
  background: ${({ theme }) => theme.colorBrown10};

  @media (max-width: 768px) {
    margin-left: 32px;
    margin-right: 32px;
  }
  @media (max-width: 576px) {
    margin-left: 24px;
    margin-right: 24px;
  }
`;

const NoQuestionText = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colorBrown40};
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Actor;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px; /* 125% */
`;
