/* eslint-disable no-unused-vars */
import { useState, useRef, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import binIcon from '../../assets/Trash.svg';
import binIconDark from '../../assets/Trash-dark.svg';
import useSubjectData from '../../hooks/useSubjectData';
import deleteQuestion from '../../services/deleteQuestion';
import useQuestionsAtom from '../../hooks/useQuestions';
import AlertModal from '../Modal/AlertModal';

function DeleteQuestionButton({ questionId }) {
  const { mode } = useContext(ThemeContext);

  const [questions, setQuestions, setQuestion] = useQuestionsAtom();
  const [subjectData, setSubjectData] = useSubjectData();

  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef();
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const clickOutside = e => {
    if (modalRef.current && modalRef.current === e.target) {
      setModalOpen(false);
    }
  };

  const handleDelete = async () => {
    await deleteQuestion(questionId);
    setQuestion(null, questionId, true);
    setSubjectData(prev => ({
      ...prev,
      questionCount: prev.questionCount - 1,
    }));
  };
  return (
    <>
      <S.Button onClick={() => setModalOpen(true)}>
        <img src={mode === 'light' ? binIcon : binIconDark} alt="delete" />
        <S.Content>
          <span>질문삭제</span>
        </S.Content>
      </S.Button>
      {modalOpen && (
        <AlertModal
          setModalOpen={setModalOpen}
          handleDelete={handleDelete}
          closeModal={handleCloseModal}
        />
      )}
      <OutSide
        tabIndex={0}
        role="button"
        ref={modalRef}
        onClick={clickOutside}
        onKeyDown={clickOutside}
        aria-label="외부 클릭시 닫힘"
      />
    </>
  );
}
const OutSide = styled.div`
  display: none;
`;
const Button = styled.button`
  display: flex;
  // width: 120px;
  padding: 6px 8px;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colorGrayScale30};
  background: ${({ theme }) => theme.colorGrayScale10};

  /* 1pt */
  box-shadow: var(--shadow-1pt);
  color: ${({ theme }) => theme.colorGrayScale50};

  cursor: pointer;

  @media (min-width: 768px) {
    padding: 6px 16px;
  }

  &:hover {
    color: ${({ theme }) => theme.colorGrayScale60};
    background: ${({ theme }) => theme.colorGrayScale20};
  }
`;

const Content = styled.span`
  display: none;

  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;

  font-feature-settings:
    'clig' off,
    'liga' off;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 128.571% */

  @media (min-width: 768px) {
    display: flex;
  }
`;

// 스타일
const S = {
  Button,
  Content,
};

export default DeleteQuestionButton;
