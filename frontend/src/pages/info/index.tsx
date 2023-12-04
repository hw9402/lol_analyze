import { useEffect, useState } from "react";
import { getHomeInfo } from "../../apis";
import {Link, useParams} from "react-router-dom";
import styled from "styled-components";
import {MostType, RankType, rankTypeDefault} from "./type";
import RankInfo from "../../components/info/RankInfo";
import MostInfo from "../../components/info/MostInfo";

const Info = () => {

  const [rank, setRank] = useState<RankType>(rankTypeDefault);
  const [most, setMost] = useState<MostType[]>([]);
  const { name } = useParams();

  const getName = (): string => {
    const notNullName = name ?? "";
    return notNullName.replace("-", "#");
  }

  useEffect((): void => {
    const getInfo = async () => {
      const response = await getHomeInfo(name ?? "");

      if (!response) {
        alert("소환사가 존재하지 않거나 형식에 맞지 않습니다.");
        window.location.href = "/";
      } else {
        setRank(response.rank);
        setMost(response.most);
      }
    };

    getInfo();
  }, []);

  return (
      <>
        <Container>
          <Header>소환사 {getName()} 님의 정보</Header>
          <RankInfoWrap>
            <RankInfo
              type="솔로랭크"
              tier ={rank.solo_rank_info.tier}
              grade = {rank.solo_rank_info.grade}
              point = {rank.solo_rank_info.point}
            />
            <RankInfo
              type="자유랭크"
              tier ={rank.flex_rank_info.tier}
              grade = {rank.flex_rank_info.grade}
              point = {rank.flex_rank_info.point}
            />
          </RankInfoWrap>
          <MostWrap>
            {most.map((value: MostType, index: number) => (
                <Link to={`/${name}/${index + 1}`} >
                  <MostInfo
                      mostInfo = { value }
                  />
                </Link>
            ))}
          </MostWrap>
          <Home
            onClick={(e) => {
              window.location.href = "/";
            }}
          >홈으로</Home>
        </Container>
      </>
  );
};

export default Info;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 60px;
  font-family: 'Pretendard-Regular', 'serif';
`;

const Header = styled.div`
  font-size: 28px;
  text-align: center;
`;

const RankInfoWrap = styled.div`
  width: 500px;
  display: flex;
  gap: 12px;
  justify-content: space-between;
`;

const MostWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Home = styled.button`
  width: 100px;
  height: 40px;
  background-color: lightblue;
  border-radius: 16px;
`;