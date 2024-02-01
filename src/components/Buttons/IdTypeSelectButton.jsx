import styled from 'styled-components';

export default function IdTypeSelectButton({ connectType, setConnectType }) {
  const handle = e => {
    setConnectType(e.target.value);
  };

  return (
    <IdTypeSelectorWrapper>
      <Label>
        <Input
          onChange={handle}
          type="radio"
          name="type"
          value="new"
          checked={connectType !== 'ordinary'}
        />
        <span>새 아이디로 접속</span>
      </Label>
      <Label>
        <Input onChange={handle} type="radio" name="type" value="ordinary" />
        <span>기존 아이디로 접속</span>
      </Label>
    </IdTypeSelectorWrapper>
  );
}

const Label = styled.label`
  color: ${({ theme }) => theme.colorGrayScale50};
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const IdTypeSelectorWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  margin: 0 5px;
`;
