import AuthForm from "../../components/auth/AuthForm";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import LogoText from "../../components/ui/LogoText";
import SwipePageIndicator from "../../components/ui/SwipePageIndicator";
import { GlobalStyles } from "../../constants/styles";
import IconText from "../../components/ui/IconText";
import { useState } from "react";
import { AuthValues } from "../../components/auth/types";
import { signIn } from "../../api/authAPI";
import { authenticate, endMoreInfoFlow } from "../../store/redux/authSlice";
import {
  loadCurrentUser,
  setCurrenUserID,
} from "../../store/redux/accountSlice";
import { useAppDispatch } from "../../store/redux/hooks";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { batch } from "react-redux";

const SignInScreen = ({ navigation }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const dispatch = useAppDispatch();

  const signInHandler = async (authData: AuthValues) => {
    setIsAuthenticating(true);

    await signIn(authData.email, authData.password)
      .then((res) => {
        batch(() => {
          dispatch(authenticate(res.user.uid));
          dispatch(setCurrenUserID(res.user.uid));
          dispatch(loadCurrentUser());
          dispatch(endMoreInfoFlow());
        });
      })
      .catch((error) => {
        Alert.alert("Authentication failed", "Could not sign user " + error);
        setIsAuthenticating(false);
      });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.logoWrapper}>
        <LogoText />
      </View>
      <View style={{ flex: 2 }}>
        <AuthForm isSignIn onSubmit={signInHandler} />
      </View>
      <View style={styles.mediaSignInWrapper}></View>
      <View style={styles.swipePageWrapper}>
        <Pressable onPress={() => navigation.navigate("SignUp")}>
          <IconText
            icon={{
              name: "arrow-back-outline",
              color: GlobalStyles.colors.primary500,
              size: 20,
              position: "left",
            }}
            text={"New here? Create an account"}
            styleText={styles.swipePageText}
          />
        </Pressable>
        <SwipePageIndicator totalPages={2} activePageIndex={1} />
      </View>
      <LoadingOverlay isLoading={isAuthenticating} />
    </View>
  );
};

export default SignInScreen;

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 40,
    paddingBottom: 20,
  },
  logoWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  mediaSignInWrapper: { flex: 2 },
  swipePageWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  swipePageText: {
    color: GlobalStyles.colors.primary500,
  },
});
