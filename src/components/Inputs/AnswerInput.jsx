/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import styled from 'styled-components';
import postAnswer from '../../services/postAnswer';
import patchAnswer from '../../services/patchAnswer';
import useQuestionsAtom from '../../hooks/useQuestions';
import useEditMode from '../../hooks/useEditMode';

export default function AnswerInput({ questionId, answerId, isEditMode }) {
  const btnText = isEditMode ? '수정 완료' : '답변 완료';
  const [answer, setAnswer] = useState('');

  const [questions, setQuestions, setQuestion] = useQuestionsAtom();
  const [editModeId, setEditModeId] = useEditMode();

  // textarea 값이 변경될 때마다 호출
  const handleAnswerChange = e => {
    setAnswer(e.target.value);
  };

  const handlePostClick = async () => {
    const result = await postAnswer(questionId, {
      content: answer,
      isRejected: 'false',
    });
    setQuestion(result, result.questionId);
  };

  const handlePatchClick = async () => {
    const result = await patchAnswer(answerId, {
      content: answer,
      isRejected: 'false',
    });
    setQuestion(result, result.questionId);
    setEditModeId(null);
  };
  return (
    <Input>
      <textarea
        placeholder="답변을 입력해주세요"
        value={answer}
        onChange={handleAnswerChange}
      />
      <Button
        onClick={
          answer ? (isEditMode ? handlePatchClick : handlePostClick) : null
        }
        $answer={answer}
      >
        {btnText}
      </Button>
    </Input>
  );
}

const Input = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  textarea {
    display: flex;
    width: 100%;
    height: 18rem;
    padding: 1.6rem;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    gap: 1rem;
    border-radius: 1rem;
    background: ${({ theme }) => theme.colorGrayScale20};
    color: ${({ theme }) => theme.colorGrayScale60};
    font-family: Pretendard;
    font-size: 1.52rem;
    font-style: normal;
    font-weight: 400;
    border: none;
    resize: none;
  }
`;

const Button = styled.button`
  display: flex;
  width: 100%;
  padding: 1.2rem 2.4rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 0.5rem;
  color: ${({ theme }) => theme.colorGrayScale10};
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2.2rem; /* 137.5% */
  border-radius: 0.8rem;
  background: ${({ theme }) => theme.colorBrown30};
  margin-top: 0.8rem;
  height: 5rem;
  border: none;
  // cursor: pointer;
  cursor: ${({ $answer }) => ($answer ? 'pointer' : 'default')};

  background: ${({ $answer, theme }) =>
    $answer ? theme.colorBrown40 : theme.colorBrown30};
`;
