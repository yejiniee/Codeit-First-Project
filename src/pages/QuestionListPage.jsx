import { Link, useNavigate } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import { useContext } from 'react';
import QuestionList from '../components/List/QuestionList';
import logo from '../assets/headerLogo.png';
import darkLogo from '../assets/headerLogo-dark.png';
import AnswerButton from '../components/Buttons/SendQuestionButton';

function Navbar() {
  const navigateToPage = useNavigate();

  const handleIsUserID = () => {
    const userAccount = JSON.parse(localStorage.getItem('id'));
    if (userAccount === '') {
      // eslint-disable-next-line no-alert
      alert('헉~ 아이디 없삼~');
      navigateToPage(`/`);
    } else {
      navigateToPage(`/post/${userAccount}/answer`);
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleIsUserID();
    }
  };
  const { mode } = useContext(ThemeContext);

  return (
    <NavWrapper>
      <Nav>
        <Link to="/">
          <LogoImg
            src={mode === 'light' ? logo : darkLogo}
            alt="오픈마인드 로고"
          />
        </Link>
        <div
          onClick={handleIsUserID}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
        >
          <AnswerButton>답변하러 가기</AnswerButton>
        </div>
      </Nav>
    </NavWrapper>
  );
}

export default function QuestionListPage() {
  return (
    <ListContainer>
      <Navbar />
      <QuestionList />
    </ListContainer>
  );
}

const ListContainer = styled.div`
  width: 100%;
`;

const NavWrapper = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 8rem;
  @media screen and ((min-width: 375px)
and (max-width: 950px)) {
    padding: 0 5rem;
  }
`;
const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 0;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const LogoImg = styled.img`
  display: flex;
  width: 14.6rem;
  justify-content: center;
  align-items: center;
`;
