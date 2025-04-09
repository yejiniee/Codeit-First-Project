import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import QuestionWriteButton from '../components/Buttons/QuestionWriteButton';
import FeedBox from '../components/Feed/FeedBox';
import FeedCard from '../components/Feed/FeedCard';
import NoQuestionFeed from '../components/Feed/NoQuestionFeed';
import QuestionFeedHeader from '../components/Feed/QuestionFeedHeader';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import fetchQuestion from '../services/fetchQuestion';
import timeSince from '../utils/timeSince';

export default function QuestionFeedPage() {
  const { id } = useParams();
  const [subjectId, setSubjectId] = useState(id);
  const [questions, setQuestions] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 5;
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지

  const fetchMore = async () => {
    const data = await fetchQuestion(subjectId, offset, limit);
    if (data.results.length) {
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
      setOffset(prev => prev + limit);
    } else {
      setHasMore(false); // 더 이상 데이터가 없으면 false
    }
  };

  useEffect(() => {
    fetchMore();
  }, []);

  const { ref: pageEnd } = useInfiniteScroll({
    fetchMore,
    hasMore,
  });

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
  height: 1px;
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
