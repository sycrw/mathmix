import { ClockIcon, TrophyIcon } from "@heroicons/react/24/outline";
import { useNavigate, useSearchParams } from "react-router";

import type { Operation } from "@/types/operation";
import type { Question } from "@/types/question";
import type { Route } from "../+types/root";
import { getHighScore } from "@/lib/highscore";
import { secondsToTime } from "@/lib/secondsToTime";

export function meta({}: Route.MetaArgs) {
  return [{ title: "MathMix - END" }, { name: "MathMix", content: "MathMix" }];
}

export default function Game() {
  const [searchParams] = useSearchParams();
  const length = Number(searchParams.get("length"));
  const difficulty = Number(searchParams.get("difficulty"));
  const operations = (searchParams.get("operations")?.split(",") ||
    []) as Operation[];
  const withNegative = searchParams.get("withNegative") === "true";
  const time = Number(searchParams.get("time"));
  const navigate = useNavigate();

  return (
    <div className=" h-screen flex flex-col justify-center items-center">
      <div className="text-4xl font-bold">Game Over!</div>
      <div className="stats shadow mt-4">
        <div className="stat">
          <div className="stat-figure text-primary">
            <ClockIcon className="inline-block h-8 w-8 stroke-current" />
          </div>
          <div className="stat-title">Your Score</div>
          <div className="stat-value text-primary">{time} s</div>
          <div className="stat-desc">{secondsToTime(time)}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <TrophyIcon className="inline-block h-8 w-8 stroke-current" />
          </div>
          <div className="stat-title">High Score</div>
          <div className="stat-value text-secondary">
            {getHighScore(operations, difficulty, length, withNegative)} s
          </div>
          <div className="stat-desc">
            {secondsToTime(
              getHighScore(operations, difficulty, length, withNegative)
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2">
        <button
          onClick={() => {
            const searchParams = new URLSearchParams();
            searchParams.set("difficulty", difficulty.toString());
            searchParams.set("length", length.toString());
            searchParams.set("operations", operations.join(","));
            searchParams.set("withNegative", withNegative.toString());
            navigate(`/?${searchParams.toString()}`);
          }}
          className="btn btn-primary mt-8"
        >
          Back To Start
        </button>
        <button
          onClick={() => {
            const searchParams = new URLSearchParams();
            searchParams.set("difficulty", difficulty.toString());
            searchParams.set("length", length.toString());
            searchParams.set("operations", operations.join(","));
            searchParams.set("withNegative", withNegative.toString());
            navigate(`/game?${searchParams.toString()}`);
          }}
          className="btn btn-primary mt-8"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
