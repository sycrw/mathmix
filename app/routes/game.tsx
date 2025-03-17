import { use, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

import { Clock } from "../components/Clock";
import type { Operation } from "@/types/operation";
import { ProgressBar } from "../components/ProgressBar";
import type { Question } from "@/types/question";
import { QuestionInput } from "../components/QuestionInput";
import type { Route } from "../+types/root";
import { generateMathQuestion } from "../lib/questions/generator";
import { setHighScore } from "@/lib/highscore";

export function meta({}: Route.MetaArgs) {
  return [{ title: "MathMix - GAME" }, { name: "MathMix", content: "MathMix" }];
}

export default function Game() {
  const [searchParams] = useSearchParams();
  const length = Number(searchParams.get("length"));
  const difficulty = Number(searchParams.get("difficulty"));
  const operations = (searchParams.get("operations")?.split(",") ||
    []) as Operation[];
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const navigate = useNavigate();

  if (!length || !difficulty || !operations) {
    return (
      <div className=" h-screen flex flex-col justify-center items-center">
        <div>Please choose a difficulty and the amount of questions</div>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="btn btn-primary mt-8"
        >
          Back To Start
        </button>
      </div>
    );
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((currTime) => currTime + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const questions = generateMathQuestion(length, difficulty, operations);
    setQuestions(questions);
  }, []);

  function handleEndGame() {
    console.log("end game");
    setHighScore(operations, difficulty, length, time);

    const searchParams = new URLSearchParams();
    searchParams.set("difficulty", difficulty.toString());
    searchParams.set("length", length.toString());
    searchParams.set("operations", operations.join(","));
    searchParams.set("time", time.toString());
    navigate(`/end?${searchParams.toString()}`);
  }

  return (
    <div className=" h-screen flex flex-col justify-center items-center">
      <>
        <QuestionInput
          question={questions.at(currentQuestion)}
          onCorrectAnswer={() => {
            setCurrentQuestion(currentQuestion + 1);
            if (currentQuestion === questions.length - 1) {
              handleEndGame();
            }
          }}
        />
        <Clock seconds={time} />
      </>
      <ProgressBar
        maxQuestions={questions.length}
        currentQuestion={currentQuestion}
      />
    </div>
  );
}
