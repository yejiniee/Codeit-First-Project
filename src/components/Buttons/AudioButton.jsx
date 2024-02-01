/* eslint-disable jsx-a11y/media-has-caption */
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import flowerDance from '../../assets/flower-dance.mp3';
import play from '../../assets/play.svg';
import pause from '../../assets/pause.svg';

export default function AudioButton() {
  const audioRef = useRef();
  const [audioState, setAudioState] = useState(false);
  const audioPlay = () => {
    setAudioState(audioRef.current.paused);
    // eslint-disable-next-line no-unused-expressions
    audioRef.current.paused
      ? audioRef.current.play()
      : audioRef.current.pause();
  };

  useEffect(() => {
    audioRef.current.volume = 0.7;
  }, []);
  return (
    <Button type="button" onClick={audioPlay}>
      <audio ref={audioRef} src={flowerDance} loop />
      <img src={audioState ? pause : play} alt="playPause" />
    </Button>
  );
}

const Button = styled.button`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33px;
  height: 33px;
  bottom: 15px;
  left: 60px;
  border-style: none;
  background-color: var(colorGrayScale20);
  border-radius: 20px;
`;
