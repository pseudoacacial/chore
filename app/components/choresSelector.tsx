import React, { useState } from "react";
import { useChoreStore } from "../hooks/use-chore-store";

type ChoreSelectorProps = {
  selectedChores: Boolean[];
  setSelectedChores: React.Dispatch<React.SetStateAction<Boolean[]>>;
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
              style={{
                background: String(chore.color),
                opacity: selectedChores[index] ? 1 : 0.6,
              }}
              onClick={() => {
                setSelectedChores(
                  selectedChores.map((e, i) => (i === index ? !e : e)),
                );
              }}
            >
              chore.id
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChoreSelector;
