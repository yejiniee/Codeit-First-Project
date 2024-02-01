/* eslint-disable no-await-in-loop */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-unused-vars */
import styled, { ThemeContext } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import logo from '../assets/MainLogo.png';
import darkLogo from '../assets/MainLogo-dark.png';
import mainBg from '../assets/backGround.svg';
import darkMainBg from '../assets/backGround-dark.png';
import NameInput from '../components/Inputs/NameInput';
import GetQuestionButton from '../components/Buttons/GetQuestionButton';
import storeId from '../services/storeId';
import SendQuestionButton from '../components/Buttons/SendQuestionButton';
import IdTypeSelectButton from '../components/Buttons/IdTypeSelectButton';
import NicknamesListButton from '../components/Buttons/NicknameListButton';
import fetchSubject from '../services/fetchSubject';

export default function MainPage() {
  const [inputValue, setInputValue] = useState('');
  const [connectType, setConnectType] = useState('new');
  const [nicknames, setNicknames] = useState([]);

  const navigate = useNavigate();

  const handleInputValue = name => {
    setInputValue(name);
  };

  // const fetchQuestions = async () => {};
  const { mode } = useContext(ThemeContext);

  const sendName = async () => {
    if (connectType === 'new') {
      if (inputValue) {
        const { id } = await storeId(inputValue); // 이름 post요청으로 보내주고 결과 id 받아옴
        const values = JSON.parse(localStorage.getItem('userAccounts')); // 기존 데이터 불러와서 데이터타입 변환

        values.unshift({ id, name: inputValue }); // 배열 앞에 유저정보 저장
        localStorage.setItem('id', JSON.stringify(id)); // 현재 유저 정보 저장
        localStorage.setItem('userAccounts', JSON.stringify(values)); // 이 브라우저의 모든 유저 정보 저장
        navigate(`/post/${id}/answer`); // id에따른 answer페이지로 이동
      } else {
        alert('닉네임을 입력하세요.');
      }
    } else {
      const id = JSON.parse(localStorage.getItem('id'));
      if (id) {
        navigate(`/post/${id}/answer`);
      } else {
        alert('아이디를 생성하세요.');
      }
    }
  };

  const goToListPage = async () => {
    if (connectType === 'new') {
      if (inputValue) {
        const { id } = await storeId(inputValue);
        const values = JSON.parse(localStorage.getItem('userAccounts'));
        values.unshift({ id, name: inputValue });

        localStorage.setItem('id', JSON.stringify(id));
        localStorage.setItem('userAccounts', JSON.stringify(values));
        navigate('/list');
      } else {
        alert('익명으로 접속합니다용~!');
        localStorage.setItem('id', JSON.stringify(''));
        navigate('/list');
      }
    } else {
      const id = JSON.parse(localStorage.getItem('id'));
      navigate('/list');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('userAccounts') === null) {
      // 저장된 데이터 없으면 배열로 초기화
      localStorage.setItem('userAccounts', JSON.stringify([]));
    } else {
      const userAccounts = JSON.parse(localStorage.getItem('userAccounts'));
      userAccounts.map(userAccount =>
        fetchSubject(userAccount.id).then(res =>
          setNicknames(prev => [...prev, res]),
        ),
      );
    }
  }, []);
  return (
    <PageWrapper>
      <MainLogoAndInputWrapper>
        <Img src={mode === 'light' ? logo : darkLogo} alt="logo" />
        <InputAndButtonBox>
          <IdTypeSelectButton
            connectType={connectType}
            setConnectType={setConnectType}
          />
          {connectType &&
            (connectType === 'ordinary' ? (
              <NicknamesListButton
                nicknames={nicknames}
                setNicknames={setNicknames}
              />
            ) : (
              <NameInput onHandleInput={handleInputValue} />
            ))}
          <GetQuestionButton onHandleButton={sendName}>
            내 질문 피드가기
          </GetQuestionButton>
          <GetQuestionButton onHandleButton={goToListPage}>
            질문리스트 보러가기
          </GetQuestionButton>
        </InputAndButtonBox>
      </MainLogoAndInputWrapper>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  ${({ theme }) =>
    theme.mode === 'light'
      ? `background-image: url(${mainBg})`
      : `background-image: url(${darkMainBg})`};
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: contain;
  height: 100vh;
`;

const Img = styled.img`
  max-width: 456px;
  max-height: 180px;

  @media (max-width: 768px) {
    width: 248px;
    height: 98px;
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  right: 130px;
  top: 45px;
  @media (max-width: 768px) {
    position: static;
  }
`;

const InputAndButtonBox = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  display: inline-flex;
  padding: 32px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colorGrayScale10};
  @media (max-width: 768px) {
    max-width: 305px;
    padding: 24px;
  }
`;

const MainLogoAndInputWrapper = styled.div`
  padding-top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    gap: 24px;
  }
`;
