import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IconButtonProps = {
  iconName: any;
  size: number;
  color: string;
  onPress: () => void;
};

const IconButton = ({ iconName, size, color, onPress }: IconButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <Ionicons name={iconName} size={size} color={color} />
    </Pressable>
  );
};

export default IconButton;
