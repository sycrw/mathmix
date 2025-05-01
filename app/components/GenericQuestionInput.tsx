import { ArrowTurnDownLeftIcon } from "@heroicons/react/24/outline";
import type { Question } from "@/types/question";
import { useState } from "react";

interface QuestionProps {
  question: Question;
  onCorrectAnswer: (answer: number) => void;
}

export const GenericQuestionInput = ({
  question,
  onCorrectAnswer,
}: QuestionProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [showWrong, setShowWrong] = useState<boolean>(false);

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
    } else {
      setShowWrong(true);
    }
  };

  return (
    <div className="flex justify-center items-center gap-y-5 gap-2">
      <div className="text-4xl flex justify-center items-center gap-1">
        <p>{question.first}</p> <p>{operationSymbol}</p>{" "}
        <p className="flex justify-center items-center gap-1">
          {(question.second as number) < 0 ? <p>(</p> : ""}
          {question.second}
          {(question.second as number) < 0 ? <p>)</p> : ""}
        </p>
        <p>=</p>
      </div>

      <input
        className={`input aspect-square focus:outline-none  ${
          showWrong ? "input-error bg-red-300" : ""
        }`}
        value={inputValue}
        onChange={(e) => {
          setShowWrong(false);
          setInputValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onAnswer(Number(inputValue));
          }
        }}
      />
      {/*submit button */}
      <button
        onClick={() => {
          onAnswer(Number(inputValue));
        }}
        className="btn btn-primary aspect-square "
      >
        <ArrowTurnDownLeftIcon className="w-4" />
      </button>
    </div>
  );
};
