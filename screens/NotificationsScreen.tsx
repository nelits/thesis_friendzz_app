import { Dimensions, Image, StyleSheet, View } from "react-native";

import { GlobalStyles } from "../constants/styles";

const { width } = Dimensions.get("screen");
const NotificationsScreen = () => {
  return (
    <View style={styles.wrapper}>
      <Image
        source={require("../assets/stay_tuned.png")}
        style={[
          {
            width: width - 40,
            alignSelf: "center",
          },
        ]}
      />
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.white,
    padding: 20,
    paddingBottom: 180,
  },
});
