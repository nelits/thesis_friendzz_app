import WelcomeScreen from "../screens/SignUp/WelcomeScreen";
import AddMoreInfoScreen from "../screens/SignUp/AddMoreInfo/AddMoreInfoScreen";
import AddHobbiesScreen from "../screens/SignUp/AddHobbiesScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { GlobalStyles } from "../constants/styles";

const Stack = createMaterialTopTabNavigator();

const SignUpStack = () => {
  return (
    <Stack.Navigator
      tabBar={() => null}
      tabBarPosition="bottom"
      screenOptions={{
        tabBarShowLabel: false,
      }}
      sceneContainerStyle={{ backgroundColor: GlobalStyles.colors.white }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="AddMoreInfo" component={AddMoreInfoScreen} />
      <Stack.Screen name="AddHobbies" component={AddHobbiesScreen} />
    </Stack.Navigator>
  );
};

export default SignUpStack;
