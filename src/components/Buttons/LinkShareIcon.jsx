import React, { useState } from 'react';
import styled from 'styled-components';
import LinkShare from '../../assets/Share.svg';

function LinkShareIcon() {
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleLinkShareClick = () => {
    const urlToCopy = 'http://localhost:3000/post/%EB%8B%89%EB%84%A4%EC%9E%84';
    navigator.clipboard.writeText(urlToCopy).then(() => {
      setIsToastVisible(true);
      setTimeout(() => {
        setIsToastVisible(false);
      }, 5000);
    });
  };

  return (
    <div>
      <LinkShareicon
        src={LinkShare}
        alt="링크 복사 아이콘"
        onClick={handleLinkShareClick}
      />
      {isToastVisible && <ToastMessage>URL이 복사되었습니다.</ToastMessage>}
    </div>
  );
}

const LinkShareicon = styled.img`
  cursor: pointer;
`;

const ToastMessage = styled.div`
  position: fixed;
  display: inline-flex;
  font-size: 14px;
  bottom: 30px;
  padding: 12px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  width: 200px;
  height: 60px;
  color: ${({ theme }) => theme.colorGrayScale10};
  background: ${({ theme }) => theme.colorGrayScale60};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  transform: translateX(-50%);
  left: 50%;
`;

export default LinkShareIcon;
