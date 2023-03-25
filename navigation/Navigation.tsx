import { StyleSheet } from "react-native";
import {
  isAuthenticated,
  isMoreInfoFlowOverSelector,
} from "../store/redux/authSlice";
import BottomStack from "./BottomStack";
import SignUpStack from "./SignUpStack";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { useAppDispatch, useAppSelector } from "../store/redux/hooks";
import { useEffect } from "react";
import {
  loadCurrentUser,
  loadingCurrentUser,
} from "../store/redux/accountSlice";
import { ApiState } from "../store/redux/types";
import LoadingOverlay from "../components/ui/LoadingOverlay";

const Navigation = () => {
  const isUserAuthenticated = useAppSelector(isAuthenticated);
  const isMoreInfoFlowOver = useAppSelector(isMoreInfoFlowOverSelector);
  const loadingUser = useAppSelector(loadingCurrentUser);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isUserAuthenticated && loadingUser === ApiState.idle) {
      dispatch(loadCurrentUser());
    }
  }, [isUserAuthenticated]);

  if (loadingUser === ApiState.pending) {
    return <LoadingOverlay isLoading={true} />;
  }
  const stack = isMoreInfoFlowOver ? <BottomStack /> : <SignUpStack />;

  return (
    <NavigationContainer>
      {isUserAuthenticated ? stack : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
