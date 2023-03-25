import { GlobalStyles } from "../constants/styles";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FrieventRoomsScreen from "../screens/FrieventRooms/FrieventRoomsScreen";
import FrieventRoomScreen from "../screens/FrieventRooms/FrieventRoom/FrieventRoomScreen";
import FrieventOverviewScreen from "../screens/FrieventOverviewScreen";
import CreateFrieventScreen from "../screens/CreateFrievent/CreateFrieventScreen";

const FrieventsStack = createNativeStackNavigator();

const FrieventsStackScreen = () => {
  return (
    <FrieventsStack.Navigator
      screenOptions={{
        headerTintColor: GlobalStyles.colors.primary500,
      }}
    >
      <FrieventsStack.Screen
        name="AllFrieventRooms"
        component={FrieventRoomsScreen}
        options={{ title: "Frievent Rooms" }}
      />
      <FrieventsStack.Screen
        name="FrieventRoom"
        component={FrieventRoomScreen}
        options={{ title: "Frievent Overview" }}
      />
      <FrieventsStack.Screen
        name="FrieventOverview"
        component={FrieventOverviewScreen}
        options={{ title: "Frievent Overview" }}
      />
      <FrieventsStack.Screen
        name="CreateFrieventScreen"
        component={CreateFrieventScreen}
        options={{ title: "Create Frievent" }}
      />
    </FrieventsStack.Navigator>
  );
};

export default FrieventsStackScreen;
