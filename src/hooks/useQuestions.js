/* eslint-disable no-param-reassign */
import { atom, useRecoilState } from 'recoil';
import { produce } from 'immer';

const questionsAtom = atom({
  key: 'questionsAtom',
  default: [],
});

export default function useQuestionsAtom() {
  const [questions, setQuestions] = useRecoilState(questionsAtom);
  function setQuestion(newAnswer, questionId, isDeleteQuestion = false) {
    const updatedQuestionIdx = questions.findIndex(q => q.id === questionId);

    const nextQuestion = produce(questions, draft => {
      if (isDeleteQuestion) {
        draft.splice(updatedQuestionIdx, 1);
      } else {
        draft[updatedQuestionIdx].answer = newAnswer;
        draft[updatedQuestionIdx].isAnswered = !!newAnswer;
      }
    });

    setQuestions(nextQuestion);
  }

  return [questions, setQuestions, setQuestion];
}
