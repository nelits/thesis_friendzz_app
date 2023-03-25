import { UserBasic } from "../models/User";
import { StyleSheet, View } from "react-native";
import UserAttendanceItem from "./UserAttendanceItem";

type UsersAttendanceProps = {
  attendanceCapacity: number; //number of users that can attend including creator
  usersAttending: UserBasic[]; //users already attending excluding creator
  creator: UserBasic;
  horizontal?: boolean;
};

const UsersAttendance = (props: UsersAttendanceProps) => {
  const usersAttendingNum: number = props.usersAttending.length;

  const usersNum: number | undefined =
    usersAttendingNum >= 3 ? usersAttendingNum - 1 : undefined;

  const emptyNum: number | undefined =
    props.attendanceCapacity > usersAttendingNum + 1
      ? props.attendanceCapacity - usersAttendingNum - 1
      : undefined;

  return (
    <View style={[props.horizontal ? { flexDirection: "row" } : { flex: 1 }]}>
      <View style={[styles.rowView, !props.horizontal && { marginBottom: 10 }]}>
        <UserAttendanceItem
          empty={false}
          profileImg={[props.creator.profileImg]}
        />
        <UserAttendanceItem
          empty={usersAttendingNum === 0}
          profileImg={[props.usersAttending[0]?.profileImg]}
        />
      </View>
      <View style={styles.rowView}>
        <UserAttendanceItem
          empty={usersAttendingNum < 2}
          number={
            usersAttendingNum === 3 && emptyNum === undefined
              ? undefined
              : usersNum
          }
          profileImg={[
            props.usersAttending[1]?.profileImg,
            props.usersAttending[2]?.profileImg,
          ]}
        />
        <UserAttendanceItem
          empty={emptyNum !== undefined}
          number={emptyNum + usersAttendingNum > 3 ? emptyNum : undefined}
          profileImg={[props.usersAttending[2]?.profileImg]}
        />
      </View>
    </View>
  );
};

export default UsersAttendance;

const styles = StyleSheet.create({
  rowView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
