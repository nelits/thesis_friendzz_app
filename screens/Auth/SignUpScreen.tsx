import { Alert, Pressable, StyleSheet, View } from "react-native";
import SwipePageIndicator from "../../components/ui/SwipePageIndicator";
import LogoText from "../../components/ui/LogoText";
import AuthForm from "../../components/auth/AuthForm";
import IconText from "../../components/ui/IconText";
import { GlobalStyles } from "../../constants/styles";
import { createUser } from "../../api/authAPI";
import { AuthValues } from "../../components/auth/types";
import { useState } from "react";
import { authenticate } from "../../store/redux/authSlice";
import { useAppDispatch } from "../../store/redux/hooks";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { setCurrenUserID } from "../../store/redux/accountSlice";
import { batch } from "react-redux";

const SignUpScreen = ({ navigation }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const dispatch = useAppDispatch();

  const signUpHandler = async (authData: AuthValues) => {
    setIsAuthenticating(true);

    await createUser(authData.email, authData.password)
      .then((res) => {
        batch(() => {
          dispatch(authenticate(res.user.uid));
          dispatch(setCurrenUserID(res.user.uid));
        });
      })
      .catch((error) => {
        Alert.alert("Authentication failed", "Could not create user " + error);
        setIsAuthenticating(false);
      });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.logoWrapper}>
        <LogoText />
      </View>
      <View style={{ flex: 3 }}>
        <AuthForm onSubmit={signUpHandler} />
      </View>
      <View style={styles.mediaSignInWrapper}></View>
      <View style={styles.swipePageWrapper}>
        <SwipePageIndicator totalPages={2} activePageIndex={0} />
        <Pressable onPress={() => navigation.navigate("SignIn")}>
          <IconText
            icon={{
              name: "arrow-forward-outline",
              color: GlobalStyles.colors.primary500,
              size: 20,
              position: "right",
            }}
            text={"Already have an account?"}
            styleText={styles.swipePageText}
          />
        </Pressable>
      </View>
      <LoadingOverlay isLoading={isAuthenticating} />
    </View>
  );
};

export default SignUpScreen;

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
  mediaSignInWrapper: { flex: 1 },
  swipePageWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  swipePageText: {
    color: GlobalStyles.colors.primary500,
  },
});
