import { Text, View } from "react-native";
import Calendar from "../components/calendar";
import "../../global.css";
import ChoresSelector from "../components/choresSelector";
import { useChoreStore } from "../hooks/use-chore-store";
import { useState } from "react";

export default function Index() {
  const today = new Date();

  const chores = useChoreStore((state) => state.chores);
  const [selectedChores, setSelectedChores] = useState<Set<string>>(
    new Set(chores.keys()),
  );
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-xl font-bold text-blue-500">
        Today is {today.toDateString()}
      </Text>
      <Calendar date={today} selectedChores={selectedChores} />
      <ChoresSelector
        selectedChores={selectedChores}
        setSelectedChores={setSelectedChores}
      />
    </View>
  );
}
