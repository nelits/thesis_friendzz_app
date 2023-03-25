import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

type TitleProps = {
  children: string;
};

const Title = ({ children }: TitleProps) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    paddingVertical: 5,
  },
  text: {
    fontWeight: "bold",
    alignSelf: "center",
    color: GlobalStyles.colors.primary500,
  },
});
