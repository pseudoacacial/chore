import React, { useRef } from "react";
import { useChoreStore } from "../hooks/use-chore-store";
import { Pressable, View, Text } from "react-native";

const Chores = () => {
  const chores = useChoreStore((state) => state.chores);
  const addChore = useChoreStore((state) => state.addChore);
  const currentColor = useRef(0);
  const colorList = ["tomato", "cornflowerblue", "rebeccapurple"];

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
    <View>
      <Pressable onPress={handleAddChoreClick}>
        <Text>add chore</Text>
      </Pressable>

      <Text>Chores</Text>

      {[...chores].map(([id, chore]) => (
        <li key={id} style={{ background: String(chore.color) }}>
          {chore.name}
          <Pressable
            onPress={() => {
              deleteChore(id);
            }}
          >
            <Text>X</Text>
          </Pressable>
        </li>
      ))}
    </View>
  );
};

export default Chores;
