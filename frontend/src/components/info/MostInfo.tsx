import { MostType } from "../../pages/info/type";
import styled from "styled-components";
import {data} from "../../apis/champion";

const MostInfo = ({ mostInfo }: { mostInfo: MostType }) => {
  return (
      <>
        <Container>
          <Portrait src={(data as any)[mostInfo.name]} />
          <DataWrap>
            <LineWrap>
              <Data>판 수: {mostInfo.count}</Data>
              <Data>승: {mostInfo.win}</Data>
              <Data>패: {mostInfo.lose}</Data>
              <Data>승률: {mostInfo.win_rate}</Data>
              <Data>kda: {mostInfo.kda}</Data>
            </LineWrap>
            <LineWrap>
              <Data>킬: {mostInfo.avg_kill}</Data>
              <Data>데스: {mostInfo.avg_death}</Data>
              <Data>어시스트: {mostInfo.avg_assist}</Data>
              <Data>cs: {mostInfo.avg_cs}</Data>
              <Data>gold: {mostInfo.avg_gold}</Data>
            </LineWrap>
            <LineWrap>
              <Data>트리플킬: {mostInfo.triple_kill}</Data>
              <Data>쿼드라킬: {mostInfo.quadra_kill}</Data>
              <Data>펜타킬: {mostInfo.penta_kill}</Data>
            </LineWrap>
          </DataWrap>
        </Container>
      </>
  );
};

export default MostInfo;

const Container = styled.div`
  display: flex;
  gap: 50px;
  font-size: 16px;
  font-family: 'Pretendard-Regular', 'serif';
`;

const Portrait = styled.img`
  width: 72px;
`;

const DataWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const LineWrap = styled.div`
  display: flex;
  gap: 20px;
`;

const Data = styled.span`
  font-size: 16px;
`;