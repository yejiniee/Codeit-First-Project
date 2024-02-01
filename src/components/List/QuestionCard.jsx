import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import messageIcon from '../../assets/message-icon.svg';
import messageIconDark from '../../assets/Messages-dark.svg';

export default function QuestionCard({ id, name, imageSource, questionCount }) {
  const { mode } = useContext(ThemeContext);

  const navigateToFeed = useNavigate();
  return (
    <CardBox onClick={() => navigateToFeed(`/post/${id}`)}>
      <ProfileWrapper>
        <ProfileImg src={imageSource} alt="프로필 이미지" />
        <ProfileName>{name}</ProfileName>
      </ProfileWrapper>
      <ContentWrapper>
        <QuestionInfo>
          <MessageIcon
            src={mode === 'light' ? messageIcon : messageIconDark}
            alt="메시지 아이콘"
          />
          <span>받은 질문</span>
        </QuestionInfo>
        <span>{questionCount}개</span>
      </ContentWrapper>
    </CardBox>
  );
}

const CardBox = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 18.7rem;
  padding: 2rem;
  gap: 3rem;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colorGrayScale40};
  background: ${({ theme }) => theme.colorGrayScale10};
`;

const ProfileWrapper = styled.div``;

const ProfileImg = styled.img`
  width: 6rem;
  margin-bottom: 1.2rem;
  border-radius: 50%;
`;

const ProfileName = styled.h2`
  color: ${({ theme }) => theme.colorGrayScale60};
  font-size: var(--font-body1);
  font-style: normal;
  font-weight: var(--weight-regular);
  line-height: 2.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colorGrayScale40};
  font-size: var(--font-body3);
  font-style: normal;
  font-weight: var(--weight-regular);
`;

const QuestionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const MessageIcon = styled.img`
  width: 1.8rem;
  margin-right: 0.4rem;
`;
