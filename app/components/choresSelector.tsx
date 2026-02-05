import React from "react";
import { useChoreStore } from "../hooks/use-chore-store";

type ChoreSelectorProps = {};

const ChoreSelector = ({}: ChoreSelectorProps) => {
  const chores = useChoreStore((state) => state.chores);
  return (
    <div className="fixed left-0 top-0 h-full flex justify-center flex-col">
      <div className="w-6 h-1/2 overflow-scroll bg-[cornflowerblue]">
        <div className="relative flex flex-col bg-[tomato]">
          {[...chores].map(([id, chore]) => (
            <li style={{ background: String(chore.color) }}>chore.id</li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChoreSelector;
