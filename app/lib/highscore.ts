import type { Operation } from "@/types/operation";

export const getHighScore = (
  operations: Array<Operation>,
  difficulty: number,
  amount: number,
  withNegative: boolean
): number => {
  console.log("getting highscore", operations, difficulty, amount);
  const key = `highscore_${operations.join(
    ""
  )}_${difficulty}_${amount}_${withNegative}`;
  return Number(localStorage.getItem(key));
};

export const setHighScore = (
  operations: Array<Operation>,
  difficulty: number,
  amount: number,
  withNegative: boolean,
  time: number
) => {
  if (time === 0) return;

  if (
    time >
    (getHighScore(operations, difficulty, amount, withNegative) || Infinity)
  ) {
    return;
  }
  const key = `highscore_${operations.join(
    ""
  )}_${difficulty}_${amount}_${withNegative}`;
  localStorage.setItem(key, time.toString());
};
