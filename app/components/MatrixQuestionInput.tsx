import React, { useEffect, useState } from "react";

import { ArrowTurnDownLeftIcon } from "@heroicons/react/24/outline";
import type { Question } from "@/types/question";

interface MatrixQuestionInputProps {
  question: Question;
  onCorrectAnswer: (answer: Array<Array<number>>) => void;
}

export const MatrixQuestionInput = ({
  question,
  onCorrectAnswer,
}: MatrixQuestionInputProps) => {
  if (!question) {
    return <div>No More Questions</div>;
  }
  const [matrix, setMatrix] = useState<string[][]>(
    Array.from({ length: (question.answer as number[][]).length }, () =>
      Array((question.answer as number[][])[0].length).fill("")
    )
  );
  const [showWrongMatrix, setShowWrongMatrix] = useState<boolean[][]>(
    Array.from({ length: (question.answer as number[][]).length }, () =>
      Array((question.answer as number[][])[0].length).fill(false)
    )
  );

  useEffect(() => {
    setMatrix(
      Array.from({ length: (question.answer as number[][]).length }, () =>
        Array((question.answer as number[][])[0].length).fill("")
      )
    );
  }, [question]);

  function onAnswer(answer: Array<Array<number>>) {
    let isCorrect = true;
    var newWrongMatrix = Array.from(
      { length: (question.answer as number[][]).length },
      () => Array((question.answer as number[][])[0].length).fill(false)
    );
    for (let i = 0; i < answer.length; i++) {
      for (let j = 0; j < answer[i].length; j++) {
        if (answer[i][j] !== (question.answer as number[][])[i][j]) {
          isCorrect = false;
          newWrongMatrix[i][j] = true;
        }
      }
    }
    setShowWrongMatrix(newWrongMatrix);
    if (isCorrect) {
      onCorrectAnswer(answer);
    }
  }
  function getOperationSymbol() {
    switch (question?.operation) {
      case "matrixAdd":
        return "+";
      default:
        return "*";
    }
  }

  return (
    <div className="flex justify-center items-center gap-y-5 gap-2">
      {/*show first matrix */}
      <MatrixDisplay matrix={question?.first as Array<Array<number>>} />
      <p className="text-4xl font-bold">{getOperationSymbol()}</p>
      <MatrixDisplay matrix={question?.second as Array<Array<number>>} />
      <p className="text-4xl font-bold">=</p>
      <MatrixAnswer
        matrix={matrix}
        onChange={(newMatrix) => {
          // remove wrong once new value is entered
          setShowWrongMatrix((wrongMatrix) =>
            wrongMatrix.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                if (
                  cell &&
                  matrix[rowIndex][colIndex] !== newMatrix[rowIndex][colIndex]
                ) {
                  return false;
                }
                return cell;
              })
            )
          );
          setMatrix(newMatrix);
        }}
        wrongMatrix={showWrongMatrix}
        handleSubmit={() =>
          onAnswer(matrix.map((row) => row.map((cell) => Number(cell))))
        }
      />
      <button
        onClick={() => {
          onAnswer(matrix.map((row) => row.map((cell) => Number(cell))));
        }}
        className="btn btn-primary aspect-square "
      >
        <ArrowTurnDownLeftIcon className="w-4" />
      </button>
    </div>
  );
};

const MatrixDisplay = ({ matrix }: { matrix: Array<Array<number>> }) => {
  const scaleY = 1 + (matrix.length - 1) * 1.1; // Adjust scale based on number of rows

  return (
    <div className="overflow-x-auto p-4 flex justify-center">
      <div className="flex items-center">
        <div
          className="text-4xl"
          style={{ transform: `scaleY(${scaleY})`, transformOrigin: "center" }}
        >
          (
        </div>
        <table className="border-collapse mx-2">
          <tbody>
            {matrix.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className="px-4 py-2 text-center">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className="text-4xl"
          style={{ transform: `scaleY(${scaleY})`, transformOrigin: "center" }}
        >
          )
        </div>
      </div>
    </div>
  );
};

const MatrixAnswer = ({
  matrix,
  onChange,
  handleSubmit,
  wrongMatrix,
}: {
  matrix: string[][];
  onChange: (matrix: string[][]) => void;
  handleSubmit: () => void;
  wrongMatrix: boolean[][];
}) => {
  const handleChange = (rowIndex: number, colIndex: number, value: string) => {
    const newMatrix = matrix.map((r, i) =>
      r.map((c, j) => (i === rowIndex && j === colIndex ? value : c))
    );

    onChange(newMatrix);
  };

  const scaleY = 1 + (matrix.length - 1) * 1.1;

  return (
    <div className="overflow-x-auto p-4 flex justify-center overflow-y-hidden">
      <div className="flex items-center">
        <div
          className="text-4xl"
          style={{ transform: `scaleY(${scaleY})`, transformOrigin: "center" }}
        >
          (
        </div>
        <table className="border-collapse mx-2 ">
          <tbody>
            {matrix.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className="px-2 py-1">
                    <input
                      type="text"
                      value={cell}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSubmit();
                        }
                      }}
                      onChange={(e) =>
                        handleChange(rowIndex, colIndex, e.target.value)
                      }
                      className={`w-10 aspect-square text-center border border-gray-300 rounded focus:outline-none ${
                        (wrongMatrix
                          ? wrongMatrix[rowIndex][colIndex]
                          : false) && "input-error bg-red-300"
                      } `}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className="text-4xl"
          style={{ transform: `scaleY(${scaleY})`, transformOrigin: "center" }}
        >
          )
        </div>
      </div>
    </div>
  );
};
