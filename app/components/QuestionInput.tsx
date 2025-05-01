import { ArrowTurnDownLeftIcon } from "@heroicons/react/24/solid";
import { GenericQuestionInput } from "./GenericQuestionInput";
import { MatrixQuestionInput } from "./MatrixQuestionInput";
import type { Question } from "@/types/question";
import { useState } from "react";

interface QuestionProps {
  question?: Question;
  onCorrectAnswer: (answer: number | number[][]) => void;
}

export const QuestionInput = ({ question, onCorrectAnswer }: QuestionProps) => {
  if (!question) {
    return <div>No More Questions</div>;
  }
  return question.operation === "matrixAdd" ||
    question.operation === "matrixMultiply" ? (
    <MatrixQuestionInput
      question={question}
      onCorrectAnswer={onCorrectAnswer}
    />
  ) : (
    <GenericQuestionInput
      question={question}
      onCorrectAnswer={onCorrectAnswer}
    />
  );
};
