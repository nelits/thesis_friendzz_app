import { ScrollView, StyleSheet, View } from "react-native";
import HobbyItem from "./HobbyItem";
import { Hobby } from "../models/Hobby";

const HobbyList = (props: { hobbies: Hobby[] }) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        contentContainerStyle={styles.scrollWrapper}
        horizontal={true}
      >
        {props.hobbies.map((h) => (
          <HobbyItem key={h.id} hobby={h} />
        ))}
      </ScrollView>
    </View>
  );
};

export default HobbyList;

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 10,
    paddingBottom: 5,
  },
  scrollWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
