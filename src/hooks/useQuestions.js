import { atom, useRecoilState } from 'recoil';

const questionsAtom = atom({
  key: 'questionsAtom',
  default: [],
});

export default function useQuestionsAtom() {
  const [questions, setQuestions] = useRecoilState(questionsAtom);
  function setQuestion(newAnswer, questionId, isDeleteQuestion = false) {
    const updatedQuestionIdx = questions.findIndex(q => q.id === questionId);
    let newQuestion; // = { ...questions[updatedQuestionIdx], answer: newAnswer };
    if (newAnswer === null) {
      newQuestion = {
        ...questions[updatedQuestionIdx],
        isAnswered: false,
        answer: newAnswer,
      };
    } else {
      newQuestion = {
        ...questions[updatedQuestionIdx],
        isAnswered: true,
        answer: newAnswer,
      };
    }

    if (isDeleteQuestion) {
      setQuestions(prev => [
        ...prev.slice(0, updatedQuestionIdx),
        ...prev.slice(updatedQuestionIdx + 1),
      ]);
    } else {
      setQuestions(prev => [
        ...prev.slice(0, updatedQuestionIdx),
        newQuestion,
        ...prev.slice(updatedQuestionIdx + 1),
      ]);
    }
  }

  return [questions, setQuestions, setQuestion];
}
