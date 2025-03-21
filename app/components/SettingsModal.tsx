import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import { Operation } from "@/types/operation";
import { OptionsSelect } from "./OptionsSelect";

interface SettingsModalProps {
  difficulty: number;
  length: number;
  operations: Array<Operation>;
  withNegative: boolean;
  setDifficulty: (difficulty: number) => void;
  setLength: (length: number) => void;
  setOperations: (operations: Array<Operation>) => void;
  setWithNegative: (withNegative: boolean) => void;
}

export const SettingsModal = ({
  difficulty,
  length,
  operations,
  withNegative,
  setDifficulty,
  setLength,
  setOperations,
  setWithNegative,
}: SettingsModalProps) => {
  return (
    <>
      <button
        className=""
        onClick={() =>
          (document.getElementById(
            "settings_modal"
          ) as HTMLDialogElement)!.showModal()
        }
      >
        <Cog8ToothIcon className="w-6 h-6" />
      </button>
      <dialog id="settings_modal" className="modal">
        <div className="modal-box">
          <OptionsSelect
            difficulty={difficulty}
            length={length}
            operations={operations}
            withNegative={withNegative}
            setDifficulty={setDifficulty}
            setLength={setLength}
            setOperations={setOperations}
            setWithNegative={setWithNegative}
          />

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
