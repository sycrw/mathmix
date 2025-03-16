import type { Operation } from "./operation";

export interface Question {
  first: number;
  second: number;
  operation: Operation;
  answer: number;
}
