import styled from 'styled-components';

export default function GetQuestionButton({ children, onHandleButton }) {
  return <Button onClick={onHandleButton}>{children}</Button>;
}

const Button = styled.button`
  display: flex;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  background: ${({ theme }) => theme.colorBrown40};
  color: ${({ theme }) => theme.colorGrayScale10};
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 137.5% */
`;
