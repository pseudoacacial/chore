import React, { useState } from "react";
import { useChoreStore } from "../hooks/use-chore-store";

type ChoreSelectorProps = {
  selectedChores: Set<string>;
  setSelectedChores: React.Dispatch<React.SetStateAction<Set<string>>>;
};

const ChoreSelector = ({
  selectedChores,
  setSelectedChores,
}: ChoreSelectorProps) => {
  const chores = useChoreStore((state) => state.chores);

  return (
    <div className="fixed left-0 top-0 h-full flex justify-center flex-col">
      <div className="w-6 h-1/2 overflow-scroll bg-white">
        <div className="relative flex flex-col bg-[tomato]">
          {[...chores].map(([id, chore], index) => (
            <li
              className="h-6 overflow-hidden"
              style={{
                background: String(chore.color),
                opacity: selectedChores.has(id) ? 1 : 0.6,
              }}
              onClick={() => {
                setSelectedChores(
                  selectedChores.symmetricDifference(new Set([id])),
                );
              }}
            >
              {id}
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChoreSelector;
