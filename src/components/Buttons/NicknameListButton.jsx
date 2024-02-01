/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from './IdSelectButton';
import arrowUpIcon from '../../assets/arrow-up.svg';
import arrowDownIcon from '../../assets/arrow-down.svg';
import deleteSubject from '../../services/deleteSubject';

export default function NicknamesListButton({ nicknames, setNicknames }) {
  const [dropDownView, setDropDownView] = useState(false);
  const handleClickContainer = () => {
    setDropDownView(!dropDownView);
  };
  const currentUser = JSON.parse(localStorage.getItem('id'));
  const handleBlurContainer = () => {
    setTimeout(() => {
      setDropDownView(false);
    }, 200);
  };

  const selectNickname = id => {
    localStorage.setItem('id', JSON.stringify(id)); // 현재 유저 정보 저장
  };

  const deleteNickname = nickname => {
    const newNicknames = nicknames.filter(name => name.id !== nickname.id); // 새로운 닉네임 배열 만듦
    deleteSubject(nickname.id); // 아이디 삭제
    if (nickname.id === currentUser) localStorage.removeItem('id'); // 아이디랑 현재 유저랑 같으면 localStorage id 삭제
    setNicknames(newNicknames); // 새로운 닉네임 배열로 상태 변경
    localStorage.setItem('userAccounts', JSON.stringify(newNicknames)); // 새로운 닉네임 배열로 localStorage 업데이트
  };

  return (
    <>
      <DropDownButton
        $dropDownView={dropDownView}
        onClick={handleClickContainer}
        onBlur={handleBlurContainer}
      >
        {nicknames.map(
          nickname => nickname.id === currentUser && nickname.name,
        )}

        <ArrowIcon
          $dropDownView={dropDownView}
          src={dropDownView ? arrowUpIcon : arrowDownIcon}
          alt="화살표"
        />
      </DropDownButton>
      {dropDownView && (
        <IdWrapper>
          {nicknames.map(nickname => (
            <Id key={nickname.id} onClick={() => selectNickname(nickname.id)}>
              <Name>{nickname.name}</Name>
              <Span>받은 질문: {nickname.questionCount}</Span>
              <EditItem
                onClick={e => {
                  e.stopPropagation();
                  deleteNickname(nickname);
                }}
              >
                아이디삭제
              </EditItem>
            </Id>
          ))}
        </IdWrapper>
      )}
    </>
  );
}
const Name = styled.span`
  max-width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const EditItem = styled.div`
  position: absolute;
  right: 5px;
  margin-left: 10px;
  padding: 2px 2px;
  gap: 8px;

  font-size: 10px;

  color: ${({ theme }) => theme.colorGrayScale50};

  &:hover {
    color: ${({ theme }) => theme.colorGrayScale60};
    background: ${({ theme }) => theme.colorGrayScale20};
  }

  &:active {
    color: ${({ theme }) => theme.colorBlue50};
    background: ${({ theme }) => theme.colorGrayScale10};
  }
`;

const ArrowIcon = styled.img`
  width: 1.4rem;
`;

const IdWrapper = styled.ul`
  right: 30px;
  left: 30px;
  top: 110px;
  max-height: 140px;
  overflow-y: scroll;
  list-style-type: none;
  display: flex;
  position: absolute;
  flex-direction: column;
  padding: 0.4rem 0rem;
  color: ${({ theme }) => theme.colorGrayScale50};
  background: ${({ theme }) => theme.colorGrayScale10};
  border-radius: 0.8rem;
  border: 0.1rem solid ${({ theme }) => theme.colorGrayScale30};
  box-shadow: var(--shadow-1pt);
  font-weight: var(--weight-medium);
  font-size: var(--font-caption1);
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    border: 7px solid ${({ theme }) => theme.colorGrayScale40};
  }
`;

const Span = styled.span`
  font-size: 10px;
  margin-left: 10px;
  color: ${({ theme }) => theme.colorGrayScale40};
`;

const Id = styled.li`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0.6rem 1.6rem;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colorBlue50};
  }
`;

const DropDownButton = styled(Button)`
  color: ${({ $dropDownView, theme }) =>
    $dropDownView ? theme.colorGrayScale60 : theme.colorGrayScale40};
  margin-bottom: ${({ $dropDownView }) => ($dropDownView ? '0.5rem' : '0')};
  border: ${({ $dropDownView, theme }) =>
    $dropDownView
      ? `0.1rem solid ${theme.colorGrayScale60}`
      : `0.1rem solid ${theme.colorGrayScale40}`};
  border-radius: 0.8rem;
  background: ${({ theme }) => theme.colorGrayScale10};
`;
