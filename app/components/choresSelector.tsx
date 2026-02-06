import React, { useState } from "react";
import { useChoreStore } from "../hooks/use-chore-store";
import { Pressable, View } from "react-native";

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
    <View className="fixed left-0 top-0 h-full flex justify-center flex-col">
      <View className="w-6 h-1/2 overflow-scroll bg-white">
        <View className="relative flex flex-col bg-[tomato]">
          {[...chores].map(([id, chore], index) => (
            <Pressable
              className="h-6 overflow-hidden"
              style={{
                backgroundColor: String(chore.color),
                opacity: selectedChores.has(id) ? 1 : 0.6,
              }}
              onPress={() => {
                setSelectedChores(
                  selectedChores.symmetricDifference(new Set([id])),
                );
              }}
            >
              {id}
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ChoreSelector;
