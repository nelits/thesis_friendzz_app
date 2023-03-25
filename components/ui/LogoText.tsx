import { StyleSheet, Text } from "react-native";
import { Fonts } from "../../constants/fontNames";
import { GlobalStyles } from "../../constants/styles";

type LogoTextProps = {
  style?: any;
};
const LogoText = ({ style }: LogoTextProps) => {
  return <Text style={[styles.text, style]}>friendzz</Text>;
};

export default LogoText;

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    fontFamily: Fonts.GoldmanBold,
    color: GlobalStyles.colors.primary500,
    alignSelf: "center",
  },
});
