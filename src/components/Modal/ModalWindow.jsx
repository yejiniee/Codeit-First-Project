import { useContext } from 'react';
import { createPortal } from 'react-dom';
import styled, { ThemeContext } from 'styled-components';
import darkCloseButton from '../../assets/dark-close.svg';
import messageIconDark from '../../assets/Messages-dark.svg';
import messageIcon from '../../assets/Messages.svg';
import closeButton from '../../assets/x.svg';
import QuestionInput from '../Inputs/QuestionInput';

export default function ModalWindow({
  handleStoreQeustion,
  closeModal,
  setModalOpen,
  subjectId,
}) {
  const { mode } = useContext(ThemeContext);
  const handleModalClick = e => {
    // 모달 내부를 클릭했을 때는 모달이 닫히지 않도록 처리
    if (e.target.closest('.modal-content')) {
      return;
    }

    // 모달 밖의 영역을 클릭했을 때 모달을 닫도록 처리
    closeModal();
  };
  const handleStoreQuestion = question => {
    handleStoreQeustion(question);
  };
  return (
    <>
      {createPortal(
        <ModalWrapper onClick={handleModalClick}>
          <ModalContent className="modal-content">
            <ModalHeader>
              <div>
                <img
                  src={mode === 'light' ? messageIcon : messageIconDark}
                  alt="말풍선 아이콘"
                />
                <div>질문을 작성하세요</div>
              </div>
              <button type="button" onClick={closeModal}>
                <img
                  src={mode === 'light' ? closeButton : darkCloseButton}
                  alt="닫기 버튼"
                />
              </button>
            </ModalHeader>
            <QuestionInput
              subjectId={subjectId}
              handleStoreQuestion={handleStoreQuestion}
              setModalOpen={setModalOpen}
            />
          </ModalContent>
        </ModalWrapper>,
        document.body,
      )}
    </>
  );
}

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--Dim, rgba(0, 0, 0, 0.56));
`;

const ModalContent = styled.div`
  position: relative;
  border-radius: 1.5rem;
  background-color: ${({ theme }) => theme.colorGrayScale10};
  box-shadow: 0px 16px 20px 0px rgba(48, 48, 48, 0.62);
  width: 61.2rem;
  height: 45.4rem;
  flex-shrink: 0;
  padding: 4rem;
  border: none;
  z-index: 100;
  @media (max-width: 767px) {
    width: 32.7rem;
    height: 56.8rem;
    padding: 2.5rem;
  }
`;

/* 테블릿 CSS */

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4.5rem;
  @media (max-width: 767px) {
    margin-bottom: 3rem;
  }

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${({ theme }) => theme.colorGrayScale60};
    font-feature-settings:
      'clig' off,
      'liga' off;
    font-family: Actor;
    font-size: 2.4rem;
    font-weight: 400;
    line-height: 30px;
    line-height: 1.875rem; /* 125% */

    @media (max-width: 767px) {
      font-size: 2rem;
      line-height: 2.5rem; /* 125% */
    }
  }

  img {
    cursor: pointer;
  }

  button {
    border: 0;
    background-color: transparent;
  }
`;
