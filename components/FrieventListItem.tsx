import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { Frievent } from "../models/Frievent";
import IconText from "./ui/IconText";
import { toDateString } from "../utils/DateUtil";
import UsersAttendance from "./UsersAttendance";
import { GlobalStyles } from "../constants/styles";
import { getProfileSource } from "../utils/ImageUtils";

type FrieventListItemProps = {
  frievent: Frievent;
  onPressCreatorImg: () => void;
  onPressInfo: () => void;
  onPressUsersList: () => void;
};

const FrieventListItem = (props: FrieventListItemProps) => {
  const frievent: Frievent = props.frievent;

  return (
    <View>
      <View style={styles.listItem}>
        <Pressable
          style={({ pressed }) => [pressed && styles.pressable, { flex: 2 }]}
          onPress={props.onPressCreatorImg}
        >
          <View>
            <Image
              style={styles.image}
              source={getProfileSource(frievent.creator.profileImg)}
            />
          </View>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            pressed && styles.pressable,
            { flex: 3, marginHorizontal: 10 },
          ]}
          onPress={props.onPressInfo}
        >
          <View>
            <Text style={styles.usernameText}>{frievent.creator.username}</Text>
            <Text numberOfLines={2}>
              a frievent for{" "}
              <Text style={styles.categoryText}>{frievent.category.name}</Text>{" "}
              is open for up to {frievent.attendanceCapacity} people
            </Text>
          </View>
        </Pressable>
        <Pressable
          style={({ pressed }) => [pressed && styles.pressable, { flex: 2 }]}
          onPress={props.onPressUsersList}
        >
          <View style={styles.users}>
            <UsersAttendance
              usersAttending={props.frievent.usersAttending}
              attendanceCapacity={frievent.attendanceCapacity}
              creator={frievent.creator}
            />
          </View>
        </Pressable>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 2 }}></View>
        <View style={styles.scheduleInfoView}>
          <IconText
            style={{ flex: 4 }}
            icon={{
              name: "md-location",
              color: "black",
              size: 16,
              position: "left",
            }}
            text={frievent.place.description}
          />
          <IconText
            style={{ flex: 2 }}
            icon={{
              name: "time",
              color: "black",
              size: 16,
              position: "left",
            }}
            text={frievent.time}
          />
          <IconText
            style={{ flex: 3 }}
            icon={{
              name: "calendar",
              color: "black",
              size: 16,
              position: "left",
            }}
            text={toDateString(frievent.date)}
          />
        </View>
      </View>
      <View style={styles.overlayBg} />
    </View>
  );
};

export default FrieventListItem;

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pressable: {},
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  users: {
    flex: 1,
    marginBottom: 20,
  },
  usernameText: {
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
  categoryText: {
    fontWeight: "bold",
  },
  scheduleInfoView: {
    flex: 5,
    flexDirection: "row",
    position: "relative",
    bottom: 20,
  },
  overlayBg: {
    backgroundColor: GlobalStyles.colors.primary500,
    opacity: 0.5,
    height: 25,
    zIndex: -1,
    position: "relative",
    bottom: 43,
    marginStart: 40,
  },
});
