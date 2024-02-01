import { useEffect } from 'react';
import styled from 'styled-components';
import Kakaotalk from '../../assets/Kakaotalk.svg';

function KakaoShareIcon() {
  const realUrl = 'https://65ab8de97f607773eddc0349--openmind-3-2.netlify.app/';

  useEffect(() => {
    window.Kakao.cleanup();
    window.Kakao.init('59825d4c42477e0372dcecb48540516c');
  }, []);

  const shareKakao = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: 'OpenMind',
          description: '마음을 전해 보세요.',
          imageUrl: '',
          link: {
            mobileWebUrl: realUrl,
          },
        },
        buttons: [
          {
            title: '',
            link: {
              mobileWebUrl: realUrl,
            },
          },
        ],
      });
    }
  };

  return (
    <Kakaotalkicon
      src={Kakaotalk}
      alt="카카오톡 공유버튼"
      onClick={shareKakao}
    />
  );
}

const Kakaotalkicon = styled.img`
  cursor: pointer;
`;

export default KakaoShareIcon;
