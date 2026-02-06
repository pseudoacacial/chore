import React, { useRef } from "react";
import { useChoreStore } from "../hooks/use-chore-store";

const Chores = () => {
  const chores = useChoreStore((state) => state.chores);
  const addChore = useChoreStore((state) => state.addChore);
  const currentColor = useRef(0);
  const colorList = ["tomato", "cornflowerBlue", "rebeccapurple"];

  const handleAddChoreClick = () => {
    addChore({
      name: "Alice",
      color: colorList[currentColor.current % colorList.length],
      start: new Date(),
      done: [new Date()],
      type: "daily",
    });
    currentColor.current++;
  };
  const deleteChore = useChoreStore((state) => state.deleteChore);
  return (
    <>
      <button onClick={handleAddChoreClick}>add chore</button>

      <div>Chores</div>

      {[...chores].map(([id, chore]) => (
        <li key={id} style={{ background: String(chore.color) }}>
          {chore.name}
          <button
            onClick={() => {
              deleteChore(id);
            }}
          >
            X
          </button>
        </li>
      ))}
    </>
  );
};

export default Chores;
