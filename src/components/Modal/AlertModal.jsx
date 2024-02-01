import React from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';

function AlertModal({ closeModal, handleDelete }) {
  const handleModalClick = e => {
    // 모달 내부를 클릭했을 때는 모달이 닫히지 않도록 처리
    if (e.target.closest('.alert-modal-content')) {
      return;
    }
    closeModal();
  };
  return (
    <>
      {createPortal(
        <ModalWrapper onClick={handleModalClick}>
          <ModalContent className="alert-modal-content">
            <ModalText>
              <ModalTitle>정말로 삭제하시겠습니까?</ModalTitle>
              <ModalSubtitle>삭제하면 되돌릴 수 없습니다.</ModalSubtitle>
            </ModalText>
            <ButtonSelect>
              <Button type="button" onClick={handleDelete} $isDelete>
                삭제
              </Button>
              <Button type="button" onClick={closeModal}>
                취소
              </Button>
            </ButtonSelect>
          </ModalContent>
        </ModalWrapper>,
        document.body,
      )}
    </>
  );
}

export default AlertModal;

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
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 2.4rem;
  position: relative;
  border-radius: 1.5rem;
  background-color: ${({ theme }) => theme.colorGrayScale10};
  box-shadow: 0px 16px 20px 0px rgba(48, 48, 48, 0.62);
  width: 32rem;
  height: 20rem;
  flex-shrink: 0;
  padding: 4rem;
  border: none;

  @media (max-width: 767px) {
    width: 30rem;
    height: 18.75rem;
    gap: 1.8rem;
  }
`;

const ModalText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  @media (max-width: 767px) {
    gap: 0.6rem;
  }
`;

const ModalTitle = styled.div`
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.colorGrayScale60};
  font-feature-settings:
    'clig' off,
    'liga' off;
  //   font-family: Actor;
  font-size: var(--font-body1);
  font-weight: var(--weight-bold);
  line-height: 30px;
  line-height: 2.5rem; /* 125% */

  @media (max-width: 767px) {
    font-size: var(--font-body2);
    line-height: 1.875rem; /* 125% */
  }
`;

const ModalSubtitle = styled(ModalTitle)`
  color: ${({ theme }) => theme.colorGrayScale50};
  font-size: var(--font-body3);
  font-weight: var(--weight-regular);
  line-height: 2.5rem; /* 125% */

  @media (max-width: 767px) {
    font-size: var(--font-caption1);
    line-height: 1.875rem; /* 125% */
  }
`;

const ButtonSelect = styled.div`
  display: flex;
  padding: 0 3rem;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
`;

const COLORS = {
  brown40: ({ theme }) => theme.colorBrown40,
  brown50: ({ theme }) => theme.colorBrown50,
  grayscale10: ({ theme }) => theme.colorGrayScale10,
  grayscale20: ({ theme }) => theme.colorGrayScale20,
  grayscale40: ({ theme }) => theme.colorGrayScale40,
  grayscale50: ({ theme }) => theme.colorGrayScale50,
};
const Button = styled.button`
  border-radius: 8px;
  background: ${({ $isDelete }) =>
    $isDelete ? COLORS.brown40 : COLORS.grayscale10};
  width: 208px;
  height: 45px;
  font-size: var(--font-body3);
  color: ${({ $isDelete }) =>
    $isDelete ? COLORS.grayscale10 : COLORS.grayscale50};
  border: 1px solid
    ${({ $isDelete }) => ($isDelete ? COLORS.brown40 : COLORS.grayscale40)};
  box-shadow: var(--shadow-1pt);
  cursor: pointer;

  &:hover {
    background: ${({ $isDelete }) =>
      $isDelete ? COLORS.brown50 : COLORS.grayscale20};
  }
`;
