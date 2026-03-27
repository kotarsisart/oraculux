export interface OracleItem {
  questionKey: string;
  answersKey: string;
}

export type OracleMap = Record<string, OracleItem>;
