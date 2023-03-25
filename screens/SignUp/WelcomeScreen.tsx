import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import SwipePageIndicator from "../../components/ui/SwipePageIndicator";
import { GlobalStyles } from "../../constants/styles";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.imageWrapper}>
        <Image
          style={{ width: "50%", resizeMode: "contain", alignSelf: "center" }}
          source={require("../../assets/signup_img/1.png")}
        />
      </View>
      <Text style={[GlobalStyles.logoText as any, { fontSize: 20 }]}>
        Welcome to friendzz
      </Text>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>
          We are glad to have you join our community of users looking to connect
          with new friends and expand their social circle. Our app is designed
          to make it easy for you to find like-minded individuals with similar
          interests, hobbies, and locations. We hope you have a great time using
          our app and make some great connections along the way. If you have any
          questions or feedback, please don't hesitate to reach out to our
          support team. We wish you all the best in your journey to make new
          friends!
        </Text>
      </View>
      <View style={styles.buttonNavWrapper}>
        <Pressable>
          <Text style={styles.text}>{/*Skip*/}</Text>
        </Pressable>
        <SwipePageIndicator totalPages={3} activePageIndex={0} />
        <Pressable onPress={() => navigation.navigate("AddMoreInfo")}>
          <Text
            style={[styles.text, { color: GlobalStyles.colors.primary500 }]}
          >
            Next
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10,
    alignContent: "flex-end",
  },
  imageWrapper: {
    flex: 2,
  },
  textWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text: {
    textAlign: "center",
    fontWeight: "500",
  },
  buttonNavWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
