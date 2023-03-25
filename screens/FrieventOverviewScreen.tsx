import { StyleSheet, View } from "react-native";
import { useEffect } from "react";
import Button from "../components/ui/buttons/Button";
import { useAppSelector } from "../store/redux/hooks";
import { getFrieventByIdSelector } from "../store/redux/frieventsSlice";
import FrieventOverview from "../components/FrieventOverview";
import { addWaitingUser } from "../api/frieventsAPI";
import { currentUserSelector } from "../store/redux/accountSlice";

const FrieventOverviewScreen = ({ route, navigation }) => {
  const frieventId: string = route.params.frieventID;
  const frievent = useAppSelector(getFrieventByIdSelector(frieventId));

  const currentUser = useAppSelector(currentUserSelector);

  useEffect(() => {
    navigation.setOptions({ title: frievent.category.name });
  }, []);

  const onPressUserHandler = (userID: string) => {
    navigation.push("ViewProfile", { userID: userID });
  };

  const getIfUserCanJoin = (): boolean => {
    return (
      frievent.creator.id !== currentUser.id &&
      frievent.usersWaiting.findIndex((user) => user.id === currentUser.id) ===
        -1 &&
      frievent.usersAttending.findIndex(
        (user) => user.id === currentUser.id
      ) === -1
    );
  };

  return (
    <View style={styles.wrapper}>
      <FrieventOverview
        frievent={frievent}
        onPressUserHandler={onPressUserHandler}
      />
      <Button
        title={"Join"}
        onPress={async () => addWaitingUser(currentUser.id, frieventId)}
        disabled={!getIfUserCanJoin()}
      />
    </View>
  );
};

export default FrieventOverviewScreen;

const styles = StyleSheet.create({
  wrapper: {},
});
