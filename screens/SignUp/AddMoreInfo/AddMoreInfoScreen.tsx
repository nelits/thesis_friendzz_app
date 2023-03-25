import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import SwipePageIndicator from "../../../components/ui/SwipePageIndicator";
import { User } from "../../../models/User";
import { useAppDispatch, useAppSelector } from "../../../store/redux/hooks";
import {
  currentUserIDSelector,
  setCurrentUserBasicInfo,
} from "../../../store/redux/accountSlice";
import AddMoreInfoForm from "./AddMoreInfoForm";
import { createUserInfo } from "../../../api/userAPI";
import LoadingOverlay from "../../../components/ui/LoadingOverlay";
import { useState } from "react";

const AddMoreInfoScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const userID = useAppSelector(currentUserIDSelector);
  const dispatch = useAppDispatch();

  const onSaveHandler = async (user: User) => {
    setIsLoading(true);
    await createUserInfo(user);
    dispatch(setCurrentUserBasicInfo(user));
    setIsLoading(false);
    navigation.navigate("AddHobbies");
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.imageWrapper}>
        <Image
          style={{
            width: "40%",
            height: "80%",
            resizeMode: "contain",
          }}
          source={require("../../../assets/signup_img/2.png")}
        />
        <Text style={styles.text} numberOfLines={1}>
          Let's add some additional info
        </Text>
      </View>
      <View style={styles.formWrapper}>
        <AddMoreInfoForm onSubmit={onSaveHandler} userID={userID} />
      </View>
      <View style={styles.buttonNavWrapper}>
        <Pressable>
          <Text style={styles.text}>{/*Skip*/}</Text>
        </Pressable>
        <SwipePageIndicator totalPages={3} activePageIndex={1} />
        <View></View>
      </View>
      <LoadingOverlay isLoading={isLoading} />
    </View>
  );
};

export default AddMoreInfoScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10,
  },
  imageWrapper: {
    flex: 2,
    alignItems: "center",
    justifyContent: "space-around",
  },
  formWrapper: {
    flex: 4,
    padding: 20,
  },
  text: {
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
