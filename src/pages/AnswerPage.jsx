import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import DeleteAllButton from '../components/Buttons/DeleteAllButton';
import NavigateButton from '../components/Buttons/SendQuestionButton';
import FeedBox from '../components/Feed/FeedBox';
import FeedCard from '../components/Feed/FeedCard';
import NoQuestionFeed from '../components/Feed/NoQuestionFeed';
import QuestionFeedHeader from '../components/Feed/QuestionFeedHeader';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import useQuestionsAtom from '../hooks/useQuestions';
import useSubjectData from '../hooks/useSubjectData';
import fetchQuestion from '../services/fetchQuestion';
import timeSince from '../utils/timeSince';

export default function AnswerPage() {
  const { id } = useParams();
  const myId = JSON.parse(localStorage.getItem('id'));
  const navigate = useNavigate();

  useEffect(() => {
    if (Number(id) !== Number(myId)) {
      navigate(`/post/${id}`, { replace: true });
    }
  }, [id, navigate]);

  const [subjectId, setSubjectId] = useState(myId);
  const [questions, setQuestions] = useQuestionsAtom();
  const [subjectData] = useSubjectData();

  const limit = 5;
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchMore = async () => {
    const data = await fetchQuestion(subjectId, offset, limit);
    if (data?.results?.length) {
      const transformed = data.results.map(q => ({
        ...q,
        createdWhen: timeSince(q.createdAt),
        isAnswered: q.answer !== null,
        answer: q.answer
          ? {
              ...q.answer,
              createdWhen: timeSince(q.answer.createdAt),
            }
          : null,
      }));
      setQuestions(prev => [...prev, ...transformed]);
      setOffset(prev => prev + limit);
    } else {
      setHasMore(false);
    }
  };

  const { ref, isLoading } = useInfiniteScroll({ fetchMore, hasMore });

  useEffect(() => {
    setQuestions([]);
    setOffset(0);
    setHasMore(true);
    fetchMore();
  }, []);

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
              {questions.map(q => (
                <FeedCard
                  key={q.id}
                  isAnswerPage
                  question={q}
                  subjectId={subjectId}
                  setSubjectId={setSubjectId}
                />
              ))}
              <Loading ref={ref}>{isLoading && '불러오는 중...'}</Loading>
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
  justify-content: center;
  padding: 1rem;
  color: gray;
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

const S = {
  Wrapper,
  DeleteAndFeed,
};
