import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {Bar} from "react-chartjs-2";
import {useEffect, useState} from "react";
import {getMostDetails} from "../../apis";
import {useParams} from "react-router-dom";
import styled from "styled-components";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Chart = () => {
  const { name, index } = useParams();
  const [labels, setLabels] = useState<string[]>([]);
  const [champion, setChampion] = useState<string>("");
  const [championAvgStats, setChampionAvgStats] = useState<string[]>([]);
  const [mostAvgStats, setMostAvgStats] = useState<string[]>([]);
  const [state, setState] = useState<"승률" | "KDA" | "평균 킬" | "평균 데스" | "평균 어시스트" | "평균 골드" | "평균 CS">("승률");
  const [dataIdx, setDataIdx] = useState<0 | 1 | 2 | 3 | 4 | 5 | 6>(0);

  useEffect(() => {
    const onRender = async () => {
      const response = await getMostDetails(name ?? "", parseInt(index ?? "1"));

      setLabels(response.labels);
      setChampion(response.champion_name);
      setChampionAvgStats(response.champion_avg_stats_list);
      setMostAvgStats(response.most_avg_stats_list);
    }

    onRender();
  }, []);

  return (
    <Container>
      <Aside>
        <Unit onClick={() => window.location.href = `/${name}`}>돌아가기</Unit>
        <Unit onClick={() => {
          setState("승률");
          setDataIdx(0);
        }}>승률</Unit>
        <Unit onClick={() => {
          setState("KDA");
          setDataIdx(1);
        }}>KDA</Unit>
        <Unit onClick={() => {
          setState("평균 킬");
          setDataIdx(2);
        }}>평균 킬</Unit>
        <Unit onClick={() => {
          setState("평균 데스");
          setDataIdx(3);
        }}>평균 데스</Unit>
        <Unit onClick={() => {
          setState("평균 어시스트");
          setDataIdx(4);
        }}>평균 어시스트</Unit>
        <Unit onClick={() => {
          setState("평균 골드");
          setDataIdx(5);
        }}>평균 골드</Unit>
        <Unit onClick={() => {
          setState("평균 CS");
          setDataIdx(6);
        }}>평균 CS</Unit>
      </Aside>
      <StyledBar>
        <Bar
            data={{
              labels: [labels[dataIdx]],
              datasets: [
                {
                  label: `${champion} 평균`,
                  data: [Number(championAvgStats[dataIdx])],
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                  label: `${name?.replace("-", "#")}`,
                  data: [Number(mostAvgStats[dataIdx])],
                  backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: true,
                  text: `${state} 통계`,
                },
              },
            }}
        />
      </StyledBar>
    </Container>
  );
};

export default Chart;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
  font-family: 'Pretendard-Regular', 'serif';
`;

const Aside = styled.div`
  width: 100px;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Unit = styled.div`
  width: 100px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px lightgray solid;
`;

const StyledBar = styled.div`
  width: 100vw;
`;