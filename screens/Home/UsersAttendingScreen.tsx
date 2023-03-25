import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { User } from "../../models/User";
import { GlobalStyles } from "../../constants/styles";
import { getProfileSource } from "../../utils/ImageUtils";
import { useAppSelector } from "../../store/redux/hooks";
import { frieventSelectorByID } from "../../store/redux/frieventsSlice";

const UsersAttendingScreen = ({ route, navigation }) => {
  const frieventID: string = route.params.frieventID;

  const frievent = useAppSelector((state) =>
    frieventSelectorByID(state, frieventID)
  );

  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <Pressable
          key={frievent.creator.id}
          style={styles.userWrapper}
          onPress={() =>
            navigation.push("ViewProfile", { userID: frievent.creator.id })
          }
        >
          <Image
            style={styles.image}
            source={getProfileSource(frievent.creator.profileImg)}
          />
          <View style={styles.userNamesWrapper}>
            <Text style={styles.usernameText}>{frievent.creator.username}</Text>
          </View>
        </Pressable>
        {frievent.usersAttending.map((user: User) => (
          <Pressable
            key={user.id}
            style={styles.userWrapper}
            onPress={() => navigation.push("ViewProfile", { userID: user.id })}
          >
            <Image
              style={styles.image}
              source={getProfileSource(user.profileImg)}
            />
            <View style={styles.userNamesWrapper}>
              <Text style={styles.usernameText}>{user.username}</Text>
              <Text>{user.name}</Text>
            </View>
          </Pressable>
        ))}
        <Pressable
          style={({ pressed }) => [
            styles.userWrapper,
            pressed && styles.pressedAddMeText,
          ]}
          onPress={() => console.log("Add me!!!")}
        >
          <View style={[styles.image, styles.emptyCircle]}></View>
          <View style={styles.userNamesWrapper}>
            <Text style={styles.usernameText}>
              {"+ "}
              {frievent.attendanceCapacity - frievent.usersAttending.length - 1}
              {" empty seats"}
            </Text>
            <Text style={styles.addMeText}>"Add me too!"</Text>
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default UsersAttendingScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.white,
    padding: 20,
  },
  userWrapper: {
    flexDirection: "row",
    marginBottom: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  userNamesWrapper: {
    justifyContent: "space-around",
  },
  usernameText: {
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
  addMeText: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: GlobalStyles.colors.gray100,
  },
  pressedAddMeText: {
    backgroundColor: GlobalStyles.colors.primary50,
  },
  emptyCircle: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#EA7F32",
    backgroundColor: "white",
  },
});
