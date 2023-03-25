import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../../constants/styles";
import LoadingOverlay from "../LoadingOverlay";
import { useState } from "react";

type ButtonProps = {
  title: string;
  onPress: () => void;
  mode?: "flat" | "outlined";
  style?: any;
  disabled?: boolean;
};

const Button = ({ mode, onPress, title, style, disabled }: ButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onPressHandler = async () => {
    setIsLoading(true);
    await onPress();
    setIsLoading(false);
  };

  return (
    <View {...style}>
      <Pressable
        style={({ pressed }) => pressed && !disabled && styles.pressed}
        onPress={disabled ? null : onPressHandler}
      >
        <View
          style={[
            styles.wrapper,
            mode === "flat" && styles.flatWrapper,
            mode === "outlined" && styles.outlinedWrapper,
            disabled && styles.disabledWrapper,
          ]}
        >
          <Text
            style={[
              styles.text,
              mode && styles.flatText,
              disabled && styles.disabledText,
            ]}
          >
            {title}
          </Text>
        </View>
        <LoadingOverlay isLoading={isLoading} />
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary500,
    borderColor: GlobalStyles.colors.primary500,
    borderWidth: 1,
    padding: 10,
  },
  outlinedWrapper: {
    backgroundColor: "transparent",
  },
  flatWrapper: {
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
  disabledWrapper: {
    opacity: 0.5,
    backgroundColor: GlobalStyles.colors.gray500,
    borderColor: "transparent",
  },
  text: {
    color: GlobalStyles.colors.white,
    fontWeight: "bold",
  },
  flatText: {
    color: GlobalStyles.colors.primary500,
  },
  disabledText: {
    // color: GlobalStyles.colors.gray100,
  },
  pressed: {
    opacity: 0.7,
  },
});
