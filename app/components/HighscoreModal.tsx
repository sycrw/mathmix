import React, { useState, type DialogHTMLAttributes } from "react";
import { TrophyIcon } from "@heroicons/react/24/solid";
import { Operation } from "@/types/operation";
import { OptionsSelect } from "./OptionsSelect";
import { getHighScore } from "@/lib/highscore";
import { secondsToTime } from "@/lib/secondsToTime";

export const HighscoreModal = () => {
  const [operations, setOperations] = useState<Array<Operation>>([
    Operation.Add,
    Operation.Subtract,
    Operation.Multiply,
    Operation.Divide,
  ]);
  const [difficulty, setDifficulty] = useState<number>(0);
  const [length, setLength] = useState<number>(15);
  const [highscore, setHighscore] = useState<number | undefined>(undefined);
  const [noHighscore, setNoHighscore] = useState<boolean>(false);

  const handleGetHighscore = () => {
    const highscore = getHighScore(operations, difficulty / 25 + 1, length);
    if (highscore) {
      setHighscore(highscore);
      setNoHighscore(false);
    } else {
      setHighscore(undefined);
      setNoHighscore(true);
    }
  };

  return (
    <>
      <button
        onClick={() =>
          (
            document.getElementById("highscore_modal")! as HTMLDialogElement
          ).showModal()
        }
      >
        <TrophyIcon className="w-6 h-6" />
      </button>
      <dialog id="highscore_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Highscores</h3>
          <OptionsSelect
            difficulty={difficulty}
            length={length}
            operations={operations}
            setDifficulty={setDifficulty}
            setLength={setLength}
            setOperations={setOperations}
          />
          <button
            className="btn btn-secondary w-full mt-3 "
            onClick={handleGetHighscore}
          >
            Get Highscore
          </button>

          {highscore && (
            <div className="stats shadow mt-3 w-full">
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <TrophyIcon className="inline-block h-8 w-8 stroke-current" />
                </div>
                <div className="stat-title">High Score</div>
                <div className="stat-value text-secondary">{highscore} s</div>
                <div className="stat-desc">{secondsToTime(highscore)}</div>
              </div>
            </div>
          )}
          {noHighscore && (
            <div className="stats shadow mt-3 w-full">
              <div className="stat">
                <div className="stat-figure text-error">
                  <TrophyIcon className="inline-block h-8 w-8 stroke-current" />
                </div>
                <div className="stat-title">No Highscore Found</div>
                <div className="stat-value text-error">---</div>
                <div className="stat-desc">{secondsToTime(highscore)}</div>
              </div>
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
