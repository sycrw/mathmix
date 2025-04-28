import type { Operation } from "./operation";

export interface Question {
  first: number | Array<Array<number>>; // For matrix operations qualified by operation
  second: number | Array<Array<number>>;
  operation: Operation;
  answer: number | Array<Array<number>>;
}
