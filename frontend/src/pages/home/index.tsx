import styled from "styled-components";
import {useState, KeyboardEvent, ChangeEvent} from "react";

const Home = () => {
  const [name, setName] = useState<string>("");

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      window.location.href = `/${name.replace("#", "-")}`;
    }
  };

  return (
    <>
      <Container>
        <Title>LoL.gg 리그오브레전드 통계 사이트</Title>
        <SearchBox
          placeholder="소환사 이름#태그를 입력해주세요!"
          onChange={handleName}
          onKeyPress={onPressEnter}
          value={name}
        />
      </Container>
    </>
  )
}

export default Home;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  font-family: 'Pretendard-Regular', 'serif';
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 80px;
`;

const Title = styled.p`
  font-size: 32px;
`;

const SearchBox = styled.input`
  width: 300px;
  height: 60px;
  border: lightgray 1px solid;
  font-size: 20px;
  border-radius: 20px;
  padding: 8px;
  
  &::placeholder {
    font-size: 12px;
  }
`;