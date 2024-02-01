import { useState, useEffect, useRef } from 'react';
// import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import QuestionFeedHeader from '../components/Feed/QuestionFeedHeader';
import FeedBox from '../components/Feed/FeedBox';
import FeedCard from '../components/Feed/FeedCard';
import QuestionWriteButton from '../components/Buttons/QuestionWriteButton';
import fetchQuestion from '../services/fetchQuestion';
import timeSince from '../utils/timeSince';
import NoQuestionFeed from '../components/Feed/NoQuestionFeed';

export default function QuestionFeedPage() {
  const { id } = useParams();
  const [subjectId, setSubjectId] = useState(id);
  const [questions, setQuestions] = useState([]);
  const limit = 5;
  const [offset, setOffset] = useState(0); // 스크롤이 닿았을 때 새롭게 offset을 바꿈
  const [loading, setLoading] = useState(false); // 로딩 성공, 실패를 담음
  const pageEnd = useRef();

  const loadMore = () => {
    setOffset(prev => prev + 5);
  };

  const fetchPins = async (_id, _offset, _limit) => {
    fetchQuestion(_id, _offset, _limit).then(data => {
      if (data.results.length) {
        // 데이터 있으면 실행
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
    fetchPins(subjectId, offset, limit);
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
      <QuestionFeedHeader subjectId={subjectId} />
      {questions.length === 0 ? (
        <NoQuestionFeed />
      ) : (
        <FeedContainer>
          <FeedBox>
            {questions.map(questionItem => (
              <FeedCard
                key={questionItem.id}
                question={questionItem}
                subjectId={subjectId}
                setSubjectId={setSubjectId}
              />
            ))}
            <Loading ref={pageEnd} />
          </FeedBox>
        </FeedContainer>
      )}
      <QuestionWriteButton
        subjectId={subjectId}
        handleQuestion={setQuestions}
      />
    </Wrapper>
  );
}

const Loading = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colorGrayScale20};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5.4rem;
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
