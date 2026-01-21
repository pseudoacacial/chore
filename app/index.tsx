import { Text, View } from "react-native";

export default function Index() {

  const foo = "asdf"
  const today = new Date()
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Today is {today.toDateString()}</Text>
    </View>
  );
}
