import type { Question } from "@/types/question";
import { useState } from "react";

interface QuestionProps {
  question?: Question;
  onCorrectAnswer: (answer: number) => void;
}

export const QuestionInput = ({ question, onCorrectAnswer }: QuestionProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  if (!question) {
    return <div>No More Questions</div>;
  }
  const operationSymbol = (() => {
    switch (question.operation) {
      case "add":
        return "+";
      case "subtract":
        return "-";
      case "multiply":
        return "*";
      case "divide":
        return "/";
      default:
        return "";
    }
  })();

  const onAnswer = (answer: number) => {
    setInputValue(answer.toString());
    if (answer === question.answer) {
      setInputValue("");
      onCorrectAnswer(answer);
    }
  };

  return (
    <div className="flex justify-center items-center gap-y-5 gap-2">
      <div className="text-4xl flex justify-center items-center gap-1">
        <p>{question.first}</p> <p>{operationSymbol}</p>{" "}
        <p className="flex justify-center items-center gap-1">
          {question.second < 0 ? <p>(</p> : ""}
          {question.second}
          {question.second < 0 ? <p>)</p> : ""}
        </p>
        <p>=</p>
      </div>
      <input
        className="input aspect-square"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onAnswer(Number(inputValue));
          }
        }}
      />
    </div>
  );
};
