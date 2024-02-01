import styled from 'styled-components';

export default function AnswerBadge({ $isAnswered }) {
  return (
    <S.Badge $isAnswered={$isAnswered}>
      {$isAnswered ? '답변완료' : '미답변'}
    </S.Badge>
  );
}

const COLORS = {
  brown: ({ theme }) => theme.colorBrown40,
  gray: ({ theme }) => theme.colorGrayScale40,
  white: ({ theme }) => theme.colorGrayScale10,
};

const Badge = styled.span`
  display: flex;
  padding: 0.4rem 1.2rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  border-radius: 0.8rem;
  background: ${({ theme }) => theme.colorGrayScale10};

  border: 1px solid
    ${({ $isAnswered }) => ($isAnswered ? COLORS.brown : COLORS.gray)};
  color: ${({ $isAnswered }) => ($isAnswered ? COLORS.brown : COLORS.gray)};

  font-feature-settings:
    'clig' off,
    'liga' off;
  font-size: var(--font-caption1);
  font-style: normal;
  font-weight: var(--weight-medium);
  line-height: 1.8rem; /* 128.571% */
`;

// 스타일
const S = {
  Badge,
};
