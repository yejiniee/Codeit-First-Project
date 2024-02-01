import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import messageIcon from '../../assets/message-icon.svg';
import messageIconDark from '../../assets/Messages-dark.svg';
import useSubjectData from '../../hooks/useSubjectData';

export default function FeedBox({ children }) {
  const { mode } = useContext(ThemeContext);
  const [subjectData] = useSubjectData();

  return (
    <>
      <S.QuestionCount>
        <img
          src={mode === 'light' ? messageIcon : messageIconDark}
          alt="message-icon"
        />
        <S.Text>{subjectData.questionCount}개의 질문이 있습니다</S.Text>
      </S.QuestionCount>
      {children}
    </>
  );
}

const QuestionCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
`;

const Text = styled.span`
  color: ${({ theme }) => theme.colorBrown40};
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Actor;
  font-size: var(--font-body2);
  line-height: 2.4rem; /* 133.333% */
  font-style: normal;
  font-weight: var(--weight-regular);

  @media (min-width: 768px) {
    font-size: var(--font-body1);
    line-height: 2.5rem; /* 125% */
  }
`;

// 스타일
const S = {
  QuestionCount,
  Text,
};
