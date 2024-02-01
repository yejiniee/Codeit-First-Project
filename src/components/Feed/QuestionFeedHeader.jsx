import React, { useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Link } from 'react-router-dom';
import fetchSubject from '../../services/fetchSubject';
import QuestionFeedHead from '../../assets/backGround.svg';
import QuestionFeedLogo from '../../assets/headerLogo.png';
import darkQuestionFeedHead from '../../assets/backGround-dark.png';
import darkQuestionFeedLogo from '../../assets/headerLogo-dark.png';
import LinkShareIcon from '../Buttons/LinkShareIcon';
import FacebookShareIcon from '../Buttons/FacebookShareIcon';
import KakaoShareIcon from '../Buttons/KakaoShareIcon';
import useSubjectData from '../../hooks/useSubjectData';

function QuestionFeedHeader({ subjectId }) {
  const { mode } = useContext(ThemeContext);
  const [subjectData, setSubjectData] = useSubjectData();

  useEffect(() => {
    if (typeof setSubjectData === 'function') {
      fetchSubject(subjectId).then(data => {
        if (data) {
          setSubjectData(data);
        }
      });
    }
  }, [subjectId, setSubjectData]);
  return (
    <div>
      <QuestionFeedHeaderBox>
        <HeadImg
          src={mode === 'light' ? QuestionFeedHead : darkQuestionFeedHead}
          alt="main-header-img"
        />
        <Link to="/">
          <LogoImg
            src={mode === 'light' ? QuestionFeedLogo : darkQuestionFeedLogo}
            alt="logo"
          />
        </Link>
        <ProfileImg src={subjectData?.imageSource} alt="profileimg" />
      </QuestionFeedHeaderBox>
      <QuestionProfileText>{subjectData?.name} </QuestionProfileText>
      <QuestionShareIcon>
        <LinkShareIcon />
        <KakaoShareIcon />
        <FacebookShareIcon />
      </QuestionShareIcon>
    </div>
  );
}

const QuestionFeedHeaderBox = styled.div`
  position: relative;
`;

const HeadImg = styled.img`
  width: 100%;
  height: 234px;
  object-fit: cover;
`;

const LogoImg = styled.img`
  position: absolute;
  top: 50px;
  transform: translateX(-50%);
  left: 50%;
`;

const ProfileImg = styled.img`
  position: absolute;
  top: 129px;
  transform: translateX(-50%);
  left: 50%;
  border-radius: 50%;
`;

const QuestionProfileText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colorGrayScale60};
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 40px; /* 125% */
  margin-top: 110px;
`;

const QuestionShareIcon = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  gap: 12px;
  justify-content: center;
  margin-top: 12px;
`;

export default QuestionFeedHeader;
