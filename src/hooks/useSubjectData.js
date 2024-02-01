import { atom, useRecoilState } from 'recoil';

const subjectData = atom({
  key: 'subjectData',
  default: {
    imageSource: '',
    name: '',
    questionCount: '',
  },
});

const useSubjectData = () => {
  const [subjectDataRecoil, setSubjectDataRecoil] = useRecoilState(subjectData);
  return [subjectDataRecoil, setSubjectDataRecoil];
};

export default useSubjectData;
