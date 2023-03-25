import { View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const Divider = () => {
  return (
    <View
      style={{
        width: "90%",
        borderBottomWidth: 2,
        borderBottomColor: GlobalStyles.colors.primary500,
      }}
    ></View>
  );
};

export default Divider;
