import { Operation } from "@/types/operation";
import React from "react";

interface OptionsSelectProps {
  difficulty: number;
  length: number;
  operations: Array<Operation>;
  withNegative: boolean;
  setDifficulty: (difficulty: number) => void;
  setLength: (length: number) => void;
  setOperations: (operations: Array<Operation>) => void;
  setWithNegative: (withNegative: boolean) => void;
}

export const OptionsSelect = ({
  difficulty,
  length,
  operations,
  withNegative,
  setDifficulty,
  setLength,
  setOperations,
  setWithNegative,
}: OptionsSelectProps) => {
  const POSSIBLE_LENGTHS = [5, 10, 15, 30, 60, 90];
  const POSSIBLE_OPERATIONS = [
    Operation.Add,
    Operation.Subtract,
    Operation.Multiply,
    Operation.Divide,
    Operation.MatrixAdd,
    Operation.MatrixMultiply,
  ];

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold mt-3">Difficulty</h2>
        <div className="w-full mt-1">
          <input
            type="range"
            min={0}
            max="100"
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
            className="range w-full range-primary"
            step="25"
          />

          <div className="flex justify-between px-2.5 mt-3 text-xs">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mt-3">Amount</h2>
        <div className="grid grid-cols-6 gap-2 mt-1">
          {POSSIBLE_LENGTHS.map((l) => (
            <button
              key={l}
              className={`btn ${length === l && "btn-primary"}`}
              onClick={() => setLength(l)}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mt-3">Operations</h2>
        <div className="grid grid-cols-3 gap-2 mt-1">
          {POSSIBLE_OPERATIONS.map((l) => (
            <button
              key={l}
              className={`btn ${operations.includes(l) && "btn-primary"}`}
              onClick={() => {
                if (operations.includes(l)) {
                  setOperations(operations.filter((o) => o !== l));
                } else {
                  setOperations([...operations, l]);
                }
              }}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="w-full mt-3">
          <button
            className={`btn w-full ${withNegative && "btn-primary"}`}
            onClick={() => setWithNegative(!withNegative)}
          >
            With Negative Numbers
          </button>
        </div>
      </div>
    </>
  );
};
