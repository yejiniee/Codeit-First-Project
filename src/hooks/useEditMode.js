import { atom, useRecoilState } from 'recoil';

const EditModeAtom = atom({
  key: 'EditModeAtom',
  default: null, // 널이 맞습니다!
});

const useEditMode = () => {
  const [editModeId, setEditModeId] = useRecoilState(EditModeAtom);
  return [editModeId, setEditModeId];
};

export default useEditMode;
