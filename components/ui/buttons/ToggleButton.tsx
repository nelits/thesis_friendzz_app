import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../../constants/styles";

type ToggleButtonProps = {
  onPress: () => void;
  pressed: boolean;
  children: React.ReactNode;
};

const ToggleButton = ({ onPress, pressed, children }: ToggleButtonProps) => {
  return (
    <View style={[styles.wrapper, pressed ? styles.pressed : null]}>
      <Pressable onPress={onPress}>
        <Text>{children}</Text>
      </Pressable>
    </View>
  );
};

export default ToggleButton;

const styles = StyleSheet.create({
  wrapper: {
    borderColor: GlobalStyles.colors.primary500,
    borderWidth: 1,
    alignContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  pressed: {
    backgroundColor: GlobalStyles.colors.primary500,
  },
});
