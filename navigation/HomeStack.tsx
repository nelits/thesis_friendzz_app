import { GlobalStyles } from "../constants/styles";
import HomeScreen from "../screens/Home/HomeScreen";
import { Fonts } from "../constants/fontNames";
import IconButton from "../components/ui/buttons/IconButton";
import FrieventOverviewScreen from "../screens/FrieventOverviewScreen";
import UsersAttendingScreen from "../screens/Home/UsersAttendingScreen";
import Screens from "../constants/screenNames";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList } from "./types";
import ViewProfileScreen from "../screens/Profile/ViewProfileScreen";

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTintColor: GlobalStyles.colors.primary500,
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "friendzz",
          headerTitleStyle: {
            fontSize: 28,
            fontFamily: Fonts.GoldmanBold,
          },
          /*headerRight: () => (
            <IconButton
              iconName={"ellipsis-vertical-sharp"}
              size={24}
              color={GlobalStyles.colors.primary500}
              onPress={() => console.log("Add some more functionalities")}
            />
          ),*/
        }}
      />
      <HomeStack.Screen
        name="FrieventOverview"
        component={FrieventOverviewScreen}
        options={{ title: "Frievent Overview" }}
      />
      <HomeStack.Screen
        name="ViewProfile"
        component={ViewProfileScreen}
        options={{
          title: "",
        }}
      />
      <HomeStack.Screen
        name="UsersAttending"
        component={UsersAttendingScreen}
        options={{
          title: Screens.FRIENDZ_ATTENDING,
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
