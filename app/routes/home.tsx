import { useNavigate, useSearchParams } from "react-router";

import { HighscoreModal } from "@/components/HighscoreModal";
import { Operation } from "@/types/operation";
import type { Route } from "../+types/root";
import { SettingsModal } from "@/components/SettingsModal";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "MathMix" }, { name: "MathMix", content: "MathMix" }];
}

export default function Home() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState<number>(
    Number(searchParams.get("difficulty")) - 1 || 0
  );
  const [length, setLength] = useState<number>(
    Number(searchParams.get("length")) || 15
  );
  const [operations, setOperations] = useState<Array<Operation>>(
    (searchParams.get("operations")?.split(",") || [
      Operation.Add,
    ]) as Operation[]
  );
  const [withNegative, setWithNegative] = useState<boolean>(
    searchParams.get("withNegative") === "true"
  );

  const startGame = () => {
    const searchParams = new URLSearchParams();

    const translatedDifficulty = difficulty / 25 + 1;
    searchParams.set("difficulty", translatedDifficulty.toString());
    searchParams.set("length", length.toString());
    searchParams.set("operations", operations.join(","));
    searchParams.set("withNegative", withNegative.toString());
    navigate(`/game?${searchParams.toString()}`);
  };

  return (
    <div className=" h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold">MathMix</h1>
      <p className="text-lg mt-4">A simple math game to test your skills</p>
      <div className="flex justify-center items-center gap-4 mt-8">
        <HighscoreModal />
        <button
          onClick={() => {
            startGame();
          }}
          className="btn btn-primary"
        >
          Start Game
        </button>
        <SettingsModal
          difficulty={difficulty}
          length={length}
          operations={operations}
          withNegative={withNegative}
          setDifficulty={(e) => {
            console.log("setDifficulty", e);
            setDifficulty(e);
          }}
          setLength={setLength}
          setOperations={setOperations}
          setWithNegative={setWithNegative}
        />
      </div>
    </div>
  );
}
