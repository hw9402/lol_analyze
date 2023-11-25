export interface RankType {
  solo_rank_info: {
    tier: string;
    point: string;
    grade: string;
    error?: string;
  },
  flex_rank_info: {
    tier: string;
    point: string;
    grade: string;
    error?: string;
  }
}

export const rankTypeDefault = {
  solo_rank_info: {
    img: '',
    tier: '',
    point: '',
    grade: '',
  },
  flex_rank_info: {
    img: '',
    tier: '',
    point: '',
    grade: '',
  },
};

export interface MostType {
  name: string;
  img: string;
  count: string;
  win_rate: string;
  win: string;
  lose: string;
  kda: string;
  avg_kill: string;
  avg_death: string;
  avg_assist: string;
  avg_cs: string;
  avg_gold: string;
  triple_kill: string;
  quadra_kill: string;
  penta_kill: string;
}