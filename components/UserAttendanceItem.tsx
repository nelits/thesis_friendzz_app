import { Image, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { getProfileSource } from "../utils/ImageUtils";

type UserAttendanceItemProps = {
  empty: boolean;
  number?: number;
  profileImg?: string[];
};

const UserAttendanceItem = (props: UserAttendanceItemProps) => {
  if (props.empty) {
    return props.number && props.number !== 1 ? (
      <View style={styles.wrapper}>
        <View style={[styles.empty, styles.smallCircle, styles.circle2]}></View>
        <View style={[styles.empty, styles.smallCircle]}></View>
        <View style={styles.attendanceNumber}>
          <Text style={{ fontWeight: "500" }}>{props.number}</Text>
        </View>
      </View>
    ) : (
      <View style={[styles.wrapper, styles.empty, styles.bigCircle]}></View>
    );
  }

  return props.number && props.number !== 1 ? (
    <View style={styles.wrapper}>
      <Image
        style={[styles.smallCircle, styles.circle2]}
        source={getProfileSource(props.profileImg[0])}
      />
      <Image
        style={styles.smallCircle}
        source={getProfileSource(props.profileImg[1])}
      />
      <View style={styles.attendanceNumber}>
        <Text style={{ fontWeight: "500" }}>{props.number}</Text>
      </View>
    </View>
  ) : (
    <Image
      style={[styles.wrapper, styles.bigCircle]}
      source={getProfileSource(props.profileImg[0])}
    />
  );
};

export default UserAttendanceItem;

const styles = StyleSheet.create({
  wrapper: {
    marginEnd: 10,
  },
  empty: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: GlobalStyles.colors.primary500,
    backgroundColor: "white",
  },
  smallCircle: {
    width: 20,
    height: 20,
    borderRadius: 50,
  },
  bigCircle: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  circle2: {
    position: "absolute",
    top: 10,
    right: 5,
    zIndex: 10,
  },
  attendanceNumber: {
    position: "absolute",
    top: 10,
    left: 15,
    zIndex: 10,
  },
});
