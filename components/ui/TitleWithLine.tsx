import { View, Text, StyleSheet } from "react-native";

type TitleWithLineProps = {
  color: string;
  children: string;
};

const TitleWithLine = ({ children, color }: TitleWithLineProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={{ flex: 1, height: 2, backgroundColor: color }} />
      <View>
        <Text style={[styles.text, { color: color }]}>{children}</Text>
      </View>
      <View style={{ flex: 1, height: 2, backgroundColor: color }} />
    </View>
  );
};

export default TitleWithLine;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
    paddingHorizontal: 5,
  },
});
