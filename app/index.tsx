import { Text, View } from "react-native";
import Calendar from "./components/calendar";
import "../global.css";

export default function Index() {
  const foo = "asdf";
  const today = new Date();
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
      <Calendar date={today} />
    </View>
  );
}
