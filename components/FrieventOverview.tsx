import { StyleSheet, View } from "react-native";
import UserAttendanceItem from "./UserAttendanceItem";
import UserImage from "./UserImage";
import IconText from "./ui/IconText";
import { GlobalStyles } from "../constants/styles";
import { Frievent } from "../models/Frievent";
import { useState } from "react";
import { toDateString } from "../utils/DateUtil";

type FrieventOverviewProps = {
  frievent: Frievent;
  onPressUserHandler: (userId: string) => void;
};
const FrieventOverview = ({
  frievent,
  onPressUserHandler,
}: FrieventOverviewProps) => {
  const [attendingUsersListWidth, setAttendingUsersListWidth] = useState(80);

  return (
    <View style={styles.wrapper}>
      <View
        style={{
          flexDirection: "row",
          marginBottom: 10,
        }}
      >
        <View style={styles.usersCol}>
          <View style={styles.usersStatusHeader}>
            <UserAttendanceItem
              empty={false}
              number={frievent.usersAttending.length + 1}
              profileImg={[
                frievent.usersAttending[0]?.profileImg,
                frievent.usersAttending[1]?.profileImg ??
                  frievent.creator.profileImg,
              ]}
            />
            <UserAttendanceItem
              empty={true}
              number={
                frievent.attendanceCapacity - frievent.usersAttending.length - 1
              }
            />
          </View>
          <View
            style={styles.onlineUsersList}
            onLayout={(event) =>
              setAttendingUsersListWidth(event.nativeEvent.layout.width / 2)
            }
          >
            <UserImage
              imageURI={frievent.creator.profileImg}
              username={frievent.creator.username}
              width={attendingUsersListWidth}
              onPress={() => onPressUserHandler(frievent.creator.id)}
            />
            {frievent.usersAttending.map((user) => (
              <UserImage
                key={user.username}
                imageURI={user.profileImg}
                username={user.username}
                width={attendingUsersListWidth}
                onPress={() => onPressUserHandler(user.id)}
              />
            ))}
          </View>
        </View>
        <View style={styles.infoCol}>
          <IconText
            icon={{
              name: "md-location",
              color: "black",
              size: 20,
              position: "left",
            }}
            text={frievent.place.description}
            styleText={styles.infoText}
          />
          <IconText
            icon={{
              name: "time",
              color: "black",
              size: 20,
              position: "left",
            }}
            text={frievent.time}
            styleText={styles.infoText}
          />
          <IconText
            icon={{
              name: "calendar",
              color: "black",
              size: 20,
              position: "left",
            }}
            text={toDateString(frievent.date)}
            styleText={styles.infoText}
          />
        </View>
      </View>
    </View>
  );
};

export default FrieventOverview;

const styles = StyleSheet.create({
  wrapper: {
    padding: 5,
    justifyContent: "space-around",
  },
  usersCol: {
    flex: 2,
  },
  usersStatusHeader: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: GlobalStyles.colors.primary400,
    borderRadius: 10,
  },
  infoCol: {
    flex: 3,
    marginStart: 5,
    padding: 10,
    elevation: 5,
    backgroundColor: GlobalStyles.colors.white,
    justifyContent: "space-around",
  },
  infoText: {
    fontSize: 18,
  },
  onlineUsersList: {
    paddingVertical: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
});
