import { GlobalStyles } from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import CreateFrieventScreen from "../screens/CreateFrievent/CreateFrieventScreen";
import MyProfileScreen from "../screens/Profile/MyProfile/MyProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackScreen from "./HomeStack";
import { Fonts } from "../constants/fontNames";
import IconButton from "../components/ui/buttons/IconButton";
import MyFrieventsScreen from "../screens/NotificationsScreen";
import { View } from "react-native";
import { useAppDispatch } from "../store/redux/hooks";
import FrieventsStackScreen from "./FrieventsStack";
import { setProfileMenuVisibility } from "../store/redux/accountSlice";

const BottomTabs = createBottomTabNavigator();

const BottomStack = () => {
  const dispatch = useAppDispatch();

  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: GlobalStyles.colors.primary500,
        tabBarInactiveTintColor: "black",
        headerTintColor: GlobalStyles.colors.primary500,
      }}
    >
      <BottomTabs.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <BottomTabs.Screen
        name={"Frievents"}
        component={FrieventsStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="happy" color={color} size={size} />
          ),
        }}
      />
      <BottomTabs.Screen
        name={"CreateFrievent"}
        component={CreateFrieventScreen}
        options={{
          title: "Create new frievent",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="add-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <BottomTabs.Screen
        name={"Notifications"}
        component={MyFrieventsScreen}
        options={{
          title: "Notifications",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
        }}
      />
      <BottomTabs.Screen
        name={"Profile"}
        component={MyProfileScreen}
        options={{
          title: "Profile",
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: Fonts.GoldmanBold,
          },
          headerRight: () => (
            <View style={{ paddingEnd: 10 }}>
              <IconButton
                iconName={"ellipsis-vertical-sharp"}
                size={24}
                color={GlobalStyles.colors.primary500}
                onPress={() => dispatch(setProfileMenuVisibility(true))}
              />
            </View>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="md-person-sharp" color={color} size={size} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default BottomStack;
