import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import IconText from "./ui/IconText";
import { toDateString } from "../utils/DateUtil";
import UsersAttendance from "./UsersAttendance";
import { Frievent } from "../models/Frievent";
import { FrieventStatus } from "../screens/FrieventRooms/FrieventRoom/constants";

type FrieventRoomItemProps = {
  frievent: Frievent;
  status: FrieventStatus;
};

const FrieventRoomItem = ({ frievent, status }: FrieventRoomItemProps) => {
  return (
    <View
      style={[
        styles.wrapper,
        status === FrieventStatus.Active && {
          borderTopColor: "green",
          borderTopWidth: 5,
        },
        status === FrieventStatus.Closed && styles.closed,
        status === FrieventStatus.Pending && styles.pending,
      ]}
    >
      <Text style={styles.categoryText}>{frievent.category.name}</Text>
      <View style={{ flexDirection: "row" }}>
        <IconText
          icon={{
            name: "time",
            color: "black",
            size: 16,
            position: "left",
          }}
          text={frievent.time}
        />
        <IconText
          icon={{
            name: "calendar",
            color: "black",
            size: 16,
            position: "left",
          }}
          text={toDateString(frievent.date)}
        />
      </View>
      <View>
        <IconText
          icon={{
            name: "md-location",
            color: "black",
            size: 16,
            position: "left",
          }}
          text={frievent.place.description}
        />
      </View>
      <View style={styles.users}>
        <UsersAttendance
          attendanceCapacity={frievent.attendanceCapacity}
          usersAttending={frievent.usersAttending}
          creator={frievent.creator}
          horizontal={true}
        />
      </View>
    </View>
  );
};

export default FrieventRoomItem;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
    maxWidth: 200,
    maxHeight: 180,
    alignItems: "flex-start",
    justifyContent: "space-around",
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 4,
    borderTopWidth: 5,
    elevation: 4,
  },
  closed: {
    backgroundColor: GlobalStyles.colors.gray50,
    borderTopColor: GlobalStyles.colors.gray50,
    opacity: 0.5,
  },
  pending: {
    borderTopColor: GlobalStyles.colors.accent500,
  },
  users: {},
  categoryText: {
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});
