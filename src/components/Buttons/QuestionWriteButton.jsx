import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import ModalWindow from '../Modal/ModalWindow';

function QuestionWriteButton({ subjectId, handleQuestion }) {
  const [modalOpen, setModalOpen] = useState(false);
  const outSectionRef = useRef();
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const outSectionClosing = e => {
    if (outSectionRef.current === e.target) {
      setModalOpen(false);
    }
  };

  const handleStoreQuestion = data => {
    handleQuestion(data);
  };
  return (
    <>
      {modalOpen && (
        <ModalWindow
          subjectId={subjectId}
          handleStoreQeustion={handleStoreQuestion}
          setModalOpen={setModalOpen}
          closeModal={handleCloseModal}
        />
      )}
      <QuestionButton
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <QuestionWriteText />
      </QuestionButton>
      <div
        tabIndex={0}
        role="button"
        ref={outSectionRef}
        onClick={outSectionClosing}
        onKeyDown={outSectionClosing}
        aria-label="외부 클릭시 닫힘"
      />
    </>
  );
}

const QuestionButton = styled.button`
  ::after {
    content: '질문 작성하기';
  }
  display: flex;
  position: fixed;
  right: 24px;
  bottom: 24px;
  width: 208px;
  height: 54px;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 200px;
  background: ${({ theme }) => theme.colorBrown40};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: none;
  cursor: pointer;

  @media (max-width: 576px) {
    ::after {
      content: '질문 작성';
    }
    width: 123px;
    height: 54px;
    padding: 0;
  }
`;

const QuestionWriteText = styled.p`
  color: ${({ theme }) => theme.colorGrayScale10};
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px;
`;

export default QuestionWriteButton;
