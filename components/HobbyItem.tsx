import { StyleSheet, View, Text, Image } from "react-native";
import { Hobby } from "../models/Hobby";
import { GlobalStyles } from "../constants/styles";

type HobbyItemProps = {
  hobby: Hobby;
  pressed?: boolean;
};

const HobbyItem = ({ hobby, pressed }: HobbyItemProps) => {
  return (
    <View
      style={[
        styles.itemWrapper,
        pressed && { backgroundColor: GlobalStyles.colors.primary400 },
      ]}
    >
      <Image style={{ width: 30, height: 30 }} source={hobby.iconImg} />
      <Text style={styles.text}>{hobby.description}</Text>
    </View>
  );
};

export default HobbyItem;

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary100,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: GlobalStyles.colors.primary500,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginVertical: 5,
  },
  text: {
    paddingHorizontal: 10,
    fontWeight: "600",
  },
});
