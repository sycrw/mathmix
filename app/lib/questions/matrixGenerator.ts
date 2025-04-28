import { Operation } from "@/types/operation";
import type { Question } from "@/types/question";

export const generateMatrixMultiplyQuestion = (
  difficulty: number,
  withNegative: boolean
): Question => {
  const difficultyMultiplier = (() => {
    switch (difficulty) {
      case 1:
        return 10;
      case 2:
        return 10;
      case 3:
        return 10;
      case 4:
        return 100;
      default:
        return 1000;
    }
  })();
  const rowMultiplier = (() => {
    switch (difficulty) {
      case 1:
        return 2;
      case 2:
        return 3;
      case 3:
        return 4;
      case 4:
        return 4;
      default:
        return 4;
    }
  })();

  const m = Math.floor(Math.random() * rowMultiplier) + 1;
  const n = Math.floor(Math.random() * rowMultiplier) + 1;
  const k = Math.floor(Math.random() * rowMultiplier) + 1;
  const first = generateRandomMatrix(m, n, difficultyMultiplier, withNegative);
  const second = generateRandomMatrix(n, k, difficultyMultiplier, withNegative);
  const answer = multiplyMatrices(first, second);
  return {
    first,
    second,
    operation: Operation.MatrixMultiply,
    answer,
  };
};
const multiplyMatrices = (
  matrixA: Array<Array<number>>,
  matrixB: Array<Array<number>>
): Array<Array<number>> => {
  if (matrixA[0].length !== matrixB.length) {
    throw new Error("Matrices cannot be multiplied");
  }
  const result = Array.from({ length: matrixA.length }, () =>
    Array(matrixB[0].length).fill(0)
  );
  for (let i = 0; i < matrixA.length; i++) {
    for (let j = 0; j < matrixB[0].length; j++) {
      for (let k = 0; k < matrixA[0].length; k++) {
        result[i][j] += matrixA[i][k] * matrixB[k][j];
      }
    }
  }
  return result;
};

export const generateMatrixAddQuestion = (
  difficulty: number,
  withNegative: boolean
): Question => {
  const difficultyMultiplier = (() => {
    switch (difficulty) {
      case 1:
        return 10;
      case 2:
        return 10;
      case 3:
        return 10;
      case 4:
        return 100;
      default:
        return 1000;
    }
  })();
  const rowMultiplier = (() => {
    switch (difficulty) {
      case 1:
        return 2;
      case 2:
        return 3;
      case 3:
        return 4;
      case 4:
        return 4;
      default:
        return 4;
    }
  })();

  const rows = Math.floor(Math.random() * rowMultiplier) + 1;
  const cols = Math.floor(Math.random() * rowMultiplier) + 1;
  const first = generateRandomMatrix(
    rows,
    cols,
    difficultyMultiplier,
    withNegative
  );
  const second = generateRandomMatrix(
    rows,
    cols,
    difficultyMultiplier,
    withNegative
  );

  return {
    first,
    second,
    operation: Operation.MatrixAdd,
    answer: addMatrices(first, second),
  };
};

function generateRandomMatrix(
  rows: number,
  cols: number,
  multiplier: number,
  withNegative: boolean
) {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(
        Math.floor(Math.random() * multiplier) *
          (Math.random() > 0.5 && withNegative ? -1 : 1)
      );
    }
    matrix.push(row);
  }
  return matrix;
}

function addMatrices(
  matrixA: Array<Array<number>>,
  matrixB: Array<Array<number>>
): Array<Array<number>> {
  if (
    matrixA.length !== matrixB.length ||
    matrixA[0].length !== matrixB[0].length
  ) {
    throw new Error("Matrices must have the same dimensions");
  }
  const result = [];
  for (let i = 0; i < matrixA.length; i++) {
    const row = [];
    for (let j = 0; j < matrixA[i].length; j++) {
      row.push(matrixA[i][j] + matrixB[i][j]);
    }
    result.push(row);
  }
  return result;
}
