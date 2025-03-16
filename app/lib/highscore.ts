import type { Operation } from "@/types/operation";

export const getHighScore = (
  operations: Array<Operation>,
  difficulty: number,
  amount: number
): number => {
  const key = `highscore_${operations.join("")}_${difficulty}_${amount}`;
  return Number(localStorage.getItem(key));
};

export const setHighScore = (
  operations: Array<Operation>,
  difficulty: number,
  amount: number,
  time: number
) => {
  if (time === 0) return;
  console.log("time", time);
  console.log("highscore", getHighScore(operations, difficulty, amount));
  if (time > getHighScore(operations, difficulty, amount)) {
    return;
  }
  console.log(
    `setting highscore as ${time} < ${getHighScore(
      operations,
      difficulty,
      amount
    )}`
  );
  const key = `highscore_${operations.join("")}_${difficulty}_${amount}`;
  localStorage.setItem(key, time.toString());
};
