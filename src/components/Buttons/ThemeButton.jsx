import styled, { ThemeContext } from 'styled-components';
import { useContext } from 'react';
import sun from '../../assets/sun.svg';
import moon from '../../assets/moon.svg';

export default function ThemeButton({ onClick }) {
  const { mode } = useContext(ThemeContext);
  return (
    <Button onClick={onClick}>
      <img src={mode === 'light' ? sun : moon} alt="sun" />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 15px;
  left: 15px;
  border-style: none;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colorRed50};
  height: 33px;
  width: 33px;
  transition: all 0.3s;
`;
