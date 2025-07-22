import { Text, View } from "react-native";

export function Card({
  desciption,
  title,
}: {
  desciption: string;
  title: string;
}) {
  return (
    <View>
      <Text>ini component dari children {title}</Text>
      <Text>{desciption}</Text>
    </View>
  );
}