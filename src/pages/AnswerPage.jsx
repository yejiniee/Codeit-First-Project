/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useQuestionsAtom from '../hooks/useQuestions';
import useSubjectData from '../hooks/useSubjectData';
import QuestionFeedHeader from '../components/Feed/QuestionFeedHeader';
import FeedBox from '../components/Feed/FeedBox';
import FeedCard from '../components/Feed/FeedCard';
import DeleteAllButton from '../components/Buttons/DeleteAllButton';
import fetchQuestion from '../services/fetchQuestion';
import timeSince from '../utils/timeSince';
import NoQuestionFeed from '../components/Feed/NoQuestionFeed';
import NavigateButton from '../components/Buttons/SendQuestionButton';

export default function AnswerPage() {
  const { id } = useParams(); // 현재 페이지 Id
  const myId = JSON.parse(localStorage.getItem('id')); // 로그인 계정 Id
  const navigate = useNavigate();

  useEffect(() => {
    if (Number(id) !== Number(myId)) {
      navigate(`/post/${id}`, { replace: true });
    }
  }, [id, navigate]);

  const [subjectId, setSubjectId] = useState(myId);
  const [questions, setQuestions] = useQuestionsAtom();
  const [subjectData, setSubjectData] = useSubjectData();

  const limit = 5;
  const [offset, setOffset] = useState(0); // 스크롤이 닿았을 때 새롭게 offset을 바꿈
  const [loading, setLoading] = useState(false); // 로딩 성공, 실패를 담음
  const pageEnd = useRef();

  const loadMore = () => {
    setOffset(prev => prev + limit);
  };
  const fetchPins = async (_id, _offset, _limit) => {
    fetchQuestion(_id, _offset, _limit).then(data => {
      if (data?.results?.length) {
        const transformedQuestions = data.results.map(question => ({
          ...question,
          createdWhen: timeSince(question.createdAt),
          isAnswered: question.answer !== null,
          answer: question.answer
            ? {
                ...question.answer,
                createdWhen: timeSince(question.answer.createdAt),
              }
            : null,
        }));
        setQuestions(prev => [...prev, ...transformedQuestions]);
      }
      setLoading(true);
    });
  };

  useEffect(() => {
    setQuestions([]);
  }, []);

  useEffect(() => {
    if (Number(id) === Number(myId)) {
      fetchPins(subjectId, offset, limit);
    }
  }, [offset]);

  useEffect(() => {
    if (loading) {
      // 로딩되었을 때만 실행
      const observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        },
        { threshold: 1 },
      );
      // 옵저버 탐색 시작
      if (pageEnd.current) observer.observe(pageEnd.current);
    }
  }, [loading]);

  return (
    <Wrapper>
      {subjectId && <QuestionFeedHeader subjectId={subjectId} />}
      <S.DeleteAndFeed>
        <DeleteAllButton
          text="전체 삭제"
          subjectId={subjectId}
          setQuestions={setQuestions}
          questionCount={subjectData?.questionCount}
        />

        {questions.length === 0 ? (
          <NoQuestionFeed />
        ) : (
          <FeedContainer>
            <FeedBox>
              {questions.map(questionItem => (
                <FeedCard
                  key={questionItem.id}
                  isAnswerPage
                  question={questionItem}
                  subjectId={subjectId}
                  setSubjectId={setSubjectId}
                />
              ))}
              <Loading ref={pageEnd} />
            </FeedBox>
          </FeedContainer>
        )}
      </S.DeleteAndFeed>
      <Link to="/list">
        <ButtonWrapper>
          <NavigateButton>질문하러 가기</NavigateButton>
        </ButtonWrapper>
      </Link>
    </Wrapper>
  );
}

const ButtonWrapper = styled.div`
  position: fixed;
  right: 24px;
  bottom: 24px;
`;

const Loading = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colorGrayScale20};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5.4rem;

  padding-bottom: 5.4rem;
`;

const FeedContainer = styled.div`
  display: flex;
  width: 327px;
  padding: 1.6rem;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;

  border-radius: 1.6rem;
  border: 1px solid ${({ theme }) => theme.colorBrown30};
  background: ${({ theme }) => theme.colorBrown10};

  @media (min-width: 768px) {
    width: 704px;
  }
`;

const DeleteAndFeed = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-direction: column;
  align-items: flex-end;

  @media (min-width: 768px) {
    gap: 1rem;
  }
`;
// 스타일
const S = {
  Wrapper,
  DeleteAndFeed,
};
