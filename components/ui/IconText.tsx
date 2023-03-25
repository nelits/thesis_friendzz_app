import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IconTextProps = {
  icon: {
    name: any;
    color: string;
    size: number;
    position: "left" | "right";
  };
  text: string;
  styleText?: any;
  style?: any;
};

const IconText = ({ icon, text, style, styleText }: IconTextProps) => {
  return (
    <View style={[styles.view, { ...style }]}>
      {icon.position === "left" ? (
        <Ionicons name={icon.name} size={icon.size} color={icon.color} />
      ) : null}
      <Text style={[styles.text, styleText]} numberOfLines={1}>
        {text}
      </Text>
      {icon.position === "right" ? (
        <Ionicons name={icon.name} size={icon.size} color={icon.color} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    paddingEnd: 10,
    alignItems: "center",
  },
  icon: {
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 12,
  },
});

export default IconText;
