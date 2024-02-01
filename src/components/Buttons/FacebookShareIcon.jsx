import React from 'react';
import styled from 'styled-components';
import Facebook from '../../assets/Facebook.svg';

function FacebookShareIcon() {
  const handleFacebookShareClick = () => {
    const urlToShare =
      'https://65ab8799f20cd1758e7673df--openmind-3-2.netlify.app/';
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`,
      '_blank',
    );
  };

  return (
    <Facebookicon
      src={Facebook}
      alt="페이스북 공유 아이콘"
      onClick={handleFacebookShareClick}
    />
  );
}

const Facebookicon = styled.img`
  cursor: pointer;
`;

export default FacebookShareIcon;
