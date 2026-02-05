import React from "react";
import { useChoreStore } from "../hooks/use-chore-store";

const Chores = () => {
  const chores = useChoreStore((state) => state.chores);
  const addChore = useChoreStore((state) => state.addChore);
  const handleAddChoreClick = () => {
    addChore({
      name: "Alice",
      start: new Date(),
      done: [],
      type: "daily",
    });
  };
  const deleteChore = useChoreStore((state) => state.deleteChore);
  return (
    <>
      <button onClick={handleAddChoreClick}>add chore</button>

      <div>Chores</div>

      {[...chores].map(([id, chore]) => (
        <li key={id}>
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
