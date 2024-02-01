import { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import kebabImg from '../../assets/more-icon.svg';
import EditBoxModal from '../Modal/EditBoxModal';
import darkKebabImg from '../../assets/dark-more-icon.svg';

export default function KebabButton({ questionId, answerId }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { mode } = useContext(ThemeContext);

  return (
    <>
      <EditButton type="button" onClick={() => setIsOpenModal(pre => !pre)}>
        <img
          id="kebab"
          src={mode === 'light' ? kebabImg : darkKebabImg}
          alt="show-more"
        />
      </EditButton>

      {isOpenModal && (
        <EditBoxModal
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          questionId={questionId}
          answerId={answerId}
        />
      )}
    </>
  );
}

const EditButton = styled.button`
  all: unset;
  cursor: pointer;

  background: url(${kebabImg}) no-repeat;
  width: 26px;
  height: 26px;
`;
