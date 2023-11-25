import styled from "styled-components";

const RankInfo = (props: { grade: string, tier: string, point: string, type: "솔로랭크" | "자유랭크" }) => {
  return (
      <>
        <RankInfoWrap>
          <TierImage src={`/assets/tier/${props.grade ?? "unrank"}.webp`} />
          <RankDataWrap>
            <RankInfoUnit isTitle={true} >{props.type}</RankInfoUnit>
            <RankInfoUnit>티어: {props.tier ?? "UNRANK"}</RankInfoUnit>
            <RankInfoUnit>포인트: {props.point ?? 0}LP</RankInfoUnit>
          </RankDataWrap>
        </RankInfoWrap>
      </>
  );
};

export default RankInfo;

const RankInfoWrap = styled.div`
  display: flex;
  gap: 12px;
`;

const TierImage = styled.img`
  width: 100px;
`;

const RankDataWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RankInfoUnit = styled.p<{isTitle?: boolean}>`
  font-size: ${(v => v.isTitle ? "24px" : "16px")};
`;