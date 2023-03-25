import SignInScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { GlobalStyles } from "../constants/styles";
import { AuthStackParamList } from "./types";

const Stack = createMaterialTopTabNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      tabBar={() => null}
      tabBarPosition="bottom"
      screenOptions={{
        tabBarShowLabel: false,
      }}
      sceneContainerStyle={{ backgroundColor: GlobalStyles.colors.white }}
    >
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
