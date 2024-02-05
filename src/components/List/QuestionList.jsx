import { useState, useEffect } from 'react';

import styled from 'styled-components';
import QuestionCard from './QuestionCard';
import useMobileLayout from '../../utils/useMobileLayout';
import useTabletLayout from '../../utils/useTabletLayout';
import DropDownButton from '../Buttons/DropDownButton';
import Pagination from './Pagination/Pagination';
import getCardList from '../../services/fetchQuestionList';

export default function QuestionList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsCount, setCardsCount] = useState(0);
  const [sort, setSort] = useState('time');
  const [cardList, setCardList] = useState([]);
  const [orderList, setOrderList] = useState('최신순');
  const orderType = ['이름순', '최신순'];
  const MIN_CARDS = 6;
  const MAX_CARDS = 8;
  const isMobileSize = useMobileLayout();
  const isTabletSize = useTabletLayout();
  const LIMITSIZE = isMobileSize || isTabletSize ? MIN_CARDS : MAX_CARDS;

  const handleLoad = async options => {
    const { results, count } = await getCardList(options);
    setCardList(results);
    setCardsCount(count);
  };

  useEffect(() => {
    handleLoad({ sort, LIMITSIZE, currentPage });
  }, [sort, LIMITSIZE, currentPage]);

  const handleOrderClick = e => {
    if (e === '이름순') {
      setSort('name');
      setOrderList(e);
    }
    if (e === '최신순') {
      setSort('time');
      setOrderList(e);
    }
  };
  // 메인페이지에서 선택한 로컬아이디로 해당 객체의 이름에 접근
  const dataArrayString = localStorage.getItem('userAccounts');
  const dataArray = JSON.parse(dataArrayString) || [];
  const targetId = localStorage.getItem('id');
  const targetObject = dataArray.find(item => String(item.id) === targetId);
  const targetName = targetObject ? targetObject.name : '';

  return (
    <StyledBox>
      <StyledDiv>
        <Header>
          {targetName && (
            <ListTitle>
              <span>{targetName}</span> 님!
              <br />
              <p>누구에게 질문할까요?</p>
            </ListTitle>
          )}
          {!targetName && <ListTitle>누구에게 질문할까요?</ListTitle>}
          <ButtonDiv>
            <DropDownButton
              orderType={orderType}
              orderList={orderList}
              handleButtonClick={handleOrderClick}
            />
          </ButtonDiv>
        </Header>
        <StyledList>
          {cardList.map(data => (
            <QuestionCard
              id={data.id}
              key={data.id}
              name={data.name}
              imageSource={data.imageSource}
              questionCount={data.questionCount}
            />
          ))}
        </StyledList>
        <StyledPage>
          <Pagination
            cardsPerPage={LIMITSIZE}
            totalCards={cardsCount}
            setPage={setCurrentPage}
            currentPage={currentPage}
          />
        </StyledPage>
      </StyledDiv>
    </StyledBox>
  );
}
const StyledBox = styled.div`
  width: 100%;
`;
const StyledDiv = styled.div`
  display: flex;
  width: 100%;
  max-width: 120rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 3.2rem;
  margin: 0 auto;

  @media screen and ((min-width: 375px)
  and (max-width: 767px)) {
    max-width: 50rem;
    padding: 0 2.4rem;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and ((min-width: 375px)
  and (max-width: 767px)) {
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1.8rem;
    width: 100%;
  }
`;
const ListTitle = styled.h1`
  color: ${({ theme }) => theme.colorGrayScale60};
  text-align: center;
  font-size: var(--font-h1);
  font-weight: var(--weight-regular);
  line-height: 6rem;
  margin-bottom: 1.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;

  @media screen and ((min-width: 375px)
  and (max-width: 767px)) {
    display: flex;
    font-size: var(--font-h3);
    margin-bottom: 0;
    line-height: 3rem;
  }

  span {
    color: ${({ theme }) =>
      theme.mode === 'light'
        ? `var(--color-brown-40)`
        : `var(--color-blue-20)`};
    font-weight: var(--weight-bold);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }
`;

const ButtonDiv = styled.div`
  cursor: pointer;
  display: block;
  white-space: nowrap;
`;

const StyledList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(18.6rem, 22rem));
  gap: 2rem;
  padding-bottom: 4rem;
  @media (max-width: 865px) {
    padding-bottom: 6.1rem;
    grid-template-columns: repeat(3, minmax(18.6rem, 22rem));
  }

  @media screen and ((min-width: 375px) and (max-width: 767px)) {
    gap: 1.6rem;
    grid-template-columns: repeat(2, minmax(15.5rem, 22rem));
  }
`;

const StyledPage = styled.div``;
