/* eslint-disable no-unused-vars */
import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import useEditMode from '../../hooks/useEditMode';
import postAnswer from '../../services/postAnswer';
import patchAnswer from '../../services/patchAnswer';
import useQuestionsAtom from '../../hooks/useQuestions';
import deleteAnswer from '../../services/deleteAnswer';

export default function EditBoxModal({
  isOpenModal,
  setIsOpenModal,
  questionId,
  answerId,
}) {
  const [questions, setQuestions, setQuestion] = useQuestionsAtom();
  const [editModeId, setEditModeId] = useEditMode();
  const wrapperRef = useRef();
  const handleClickOutside = e => {
    if (
      wrapperRef &&
      !wrapperRef.current.contains(e.target) &&
      e.target.id !== 'kebab'
    ) {
      setIsOpenModal(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const handleEdit = () => {
    setEditModeId(questionId);
  };

  const handleDelete = async () => {
    // setEditModeId(null);
    await deleteAnswer(answerId);
    setQuestion(null, questionId);
  };

  const handleReject = async () => {
    setEditModeId(null);
    if (answerId) {
      const result = await patchAnswer(answerId, {
        isRejected: 'true',
      });
      setQuestion(result, result.questionId);
    } else {
      const result = await postAnswer(questionId, {
        content: 'default',
        isRejected: 'true',
      });
      setQuestion(result, result.questionId);
    }
  };

  return (
    <EditBox ref={wrapperRef} value={isOpenModal}>
      {answerId && <EditItem onClick={handleEdit}>답변수정</EditItem>}
      {answerId && <EditItem onClick={handleDelete}>답변삭제</EditItem>}
      <EditItem onClick={handleReject}>답변거절</EditItem>
    </EditBox>
  );
}

const EditBox = styled.div`
  position: absolute;
  top: 26px;
  right: 0;
  display: flex;
  width: 85px;
  padding: 4px 0px;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colorGrayScale30};
  background: ${({ theme }) => theme.colorGrayScale10};

  box-shadow: var(--shadow-1pt);

  overflow: hidden;
  cursor: pointer;
`;

const EditItem = styled.div`
  width: 100%;
  display: flex;
  padding: 6px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;

  font-size: var(--font-caption1);

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
