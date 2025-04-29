import {
  generateMatrixAddQuestion,
  generateMatrixMultiplyQuestion,
} from "./matrixGenerator";

import type { Operation } from "@/types/operation";
import type { Question } from "@/types/question";

export const generateMathQuestion = (
  length: number,
  difficulty: number,
  operations: Array<Operation>,
  withNegative: boolean
): Array<Question> => {
  const difficultyMultiplier = 10 ** difficulty;

  const questions: Array<Question> = [];
  for (let i = 0; i < length; i++) {
    let first;
    let second;
    const operation: Operation = operations[
      Math.floor(Math.random() * operations.length)
    ] as Operation;
    let answer = 0;
    if (operation == "divide") {
      //check that a whole number is the answer
      second =
        (Math.floor(Math.random() * difficultyMultiplier) + 1) *
        (!withNegative ? 1 : Math.random() > 0.5 ? 1 : -1);
      first =
        Math.floor(Math.random() * difficultyMultiplier) *
        second *
        (!withNegative ? 1 : Math.random() > 0.5 ? 1 : -1);
      answer = first / second;
      questions.push({
        first,
        second,
        operation,
        answer,
      });
    } else if (operation == "matrixAdd") {
      questions.push(generateMatrixAddQuestion(difficulty, withNegative));
    } else if (operation == "matrixMultiply") {
      questions.push(generateMatrixMultiplyQuestion(difficulty, withNegative));
    } else {
      first =
        Math.floor(Math.random() * difficultyMultiplier + 1) *
        (!withNegative ? 1 : Math.random() > 0.5 ? 1 : -1);
      second =
        Math.floor(Math.random() * difficultyMultiplier + 1) *
        (!withNegative ? 1 : Math.random() > 0.5 ? 1 : -1);

      switch (operation) {
        case "add":
          answer = first + second;
          break;
        case "subtract":
          answer = first - second;
          break;
        case "multiply":
          answer = first * second;
          break;
      }
      questions.push({
        first,
        second,
        operation,
        answer,
      });
    }
  }
  return questions;
};
