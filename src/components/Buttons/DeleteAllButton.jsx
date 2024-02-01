import { useState, useRef } from 'react';
import styled from 'styled-components';
import deleteQuestion from '../../services/deleteQuestion';
import fetchQuestion from '../../services/fetchQuestion';
import AlertModal from '../Modal/AlertModal';

function DeleteAllButton({ text, subjectId, setQuestions, questionCount }) {
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef();
  // console.log('불러온 질문 개수 확인', questions);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const clickOutside = e => {
    if (modalRef.current && modalRef.current === e.target) {
      setModalOpen(false);
    }
  };

  const handleDelete = async () => {
    const result = await fetchQuestion(subjectId, 0, questionCount);
    const questionId = result.results.map(item => item.id);

    await questionId.map(item => deleteQuestion(item));
    setQuestions([]);
    setModalOpen(false);
  };

  return (
    <>
      <Button onClick={() => setModalOpen(true)}>
        <ButtonText>{text}</ButtonText>
      </Button>
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
  width: 70px;
  height: 25px;

  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;

  border-radius: 20rem;
  background: ${({ theme }) => theme.colorBrown40};

  box-shadow: var(--shadow-2pt);
  border: none;
  cursor: pointer;

  @media (min-width: 768px) {
    width: 100px;
    height: 35px;
  }
`;

const ButtonText = styled.p`
  color: ${({ theme }) => theme.colorGrayScale10};
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-size: 1rem;
  font-style: normal;
  font-weight: var(--weight-regular);
  line-height: 25px;

  @media (min-width: 768px) {
    font-size: 1.4rem;
  }
`;

export default DeleteAllButton;
