import { styled } from 'styled-components';
import personIcon from '../../assets/personIcon.svg';

export default function NameInput({ onHandleInput }) {
  return (
    <InputWrapper>
      <img src={personIcon} alt="personIcon" />
      <Input
        onChange={e => {
          onHandleInput(e.target.value);
        }}
        placeholder="이름을 입력하세요"
      />
    </InputWrapper>
  );
}
const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 12px 16px;
  justify-content: left;
  align-items: center;
  gap: 4px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colorGrayScale40};
  background: ${({ theme }) => theme.colorGrayScale10};
  display: flex;
  @media (max-width: 765px) {
    padding: 12px 16px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    align-self: stretch;
  }
`;

const Input = styled.input`
  color: ${({ theme }) => theme.colorGrayScale40};
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 137.5% */
  border-style: none;
  background-color: ${({ theme }) => theme.colorGrayScale10};
  &:focus {
    border-style: none;
    outline: none;
  }

  @media (max-width: 765px) {
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
  }
`;
