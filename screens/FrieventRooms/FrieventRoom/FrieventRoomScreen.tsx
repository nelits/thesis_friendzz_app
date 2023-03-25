import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { Frievent } from "../../../models/Frievent";
import { FbFrievent } from "../../../models/firebase/firebaseModels";
import { GlobalStyles } from "../../../constants/styles";
import { firebaseFirestore } from "../../../firebaseConfig";
import LoadingOverlay from "../../../components/ui/LoadingOverlay";
import FrieventOverview from "../../../components/FrieventOverview";
import { Ionicons } from "@expo/vector-icons";
import UserImage from "../../../components/UserImage";
import { LinearGradient } from "expo-linear-gradient";
import { useAppSelector } from "../../../store/redux/hooks";
import { currentUserIDSelector } from "../../../store/redux/accountSlice";
import {
  addAttendingUser,
  getFrieventWithUsersInfo,
} from "../../../api/frieventsAPI";
import Chat from "../../../components/chat/Chat";

const FrieventRoomScreen = ({ route, navigation }) => {
  const [frievent, setFrievent] = useState<Frievent>();
  const [isLoading, setIsLoading] = useState(true);
  const [messengerActive, setMessengerActive] = useState(true);
  const currentUserID = useAppSelector(currentUserIDSelector);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(firebaseFirestore, "frievents", route.params.frieventID),
      async (documentSnapshot) => {
        await getFrieventWithUsersInfo(
          documentSnapshot.data() as FbFrievent,
          documentSnapshot.id
        ).then((frievent) => {
          setFrievent(frievent);

          navigation.setOptions({ title: frievent.category.name });
          setIsLoading(false);
        });
      }
    );

    return () => unsubscribe();
  }, []);

  const onPressUserHandler = (userID: string) => {
    navigation.push("ViewProfile", { userID: userID });
  };

  return (
    <View style={styles.wrapper}>
      {!isLoading && (
        <View style={styles.wrapper}>
          <FrieventOverview
            frievent={frievent}
            onPressUserHandler={onPressUserHandler}
          />
          <View style={styles.tabsRow}>
            <Pressable
              style={({ pressed }) => [
                pressed && styles.pressedTab,
                messengerActive && styles.activeTab,
                styles.tabs,
              ]}
              onPress={() => setMessengerActive(true)}
            >
              <Ionicons name={"chatbox"} size={20} />
            </Pressable>
            {frievent.creator.id === currentUserID && (
              <Pressable
                style={({ pressed }) => [
                  pressed && styles.pressedTab,
                  !messengerActive && styles.activeTab,
                  styles.tabs,
                ]}
                onPress={() => setMessengerActive(false)}
              >
                <Ionicons name={"timer"} size={20} />
              </Pressable>
            )}
          </View>
          {messengerActive ? (
            <View style={styles.messengerWrapper}>
              <Chat path={"frievents/" + frievent.id + "/chat"} />
            </View>
          ) : (
            frievent.creator.id === currentUserID && (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <View style={styles.waitingWrapper}>
                  {frievent.usersWaiting?.map((user) => (
                    <LinearGradient
                      key={user.id}
                      start={{ x: 1, y: 0.5 }}
                      end={{ x: 0, y: 0.5 }}
                      colors={[GlobalStyles.colors.primary200, "transparent"]}
                      style={{
                        flexDirection: "row",
                        marginTop: 10,
                      }}
                    >
                      <View>
                        <UserImage
                          imageURI={user.profileImg}
                          username={user.username}
                          width={150}
                          onPress={() => onPressUserHandler(user.id)}
                        />
                      </View>
                      <View
                        style={{
                          justifyContent: "space-around",
                          paddingEnd: 10,
                        }}
                      >
                        <Pressable
                          onPress={async () =>
                            addAttendingUser(user.id, frievent.id)
                          }
                          style={({ pressed }) => [
                            pressed && {
                              opacity: 0.2,
                            },
                          ]}
                        >
                          <Image
                            style={[{ width: 30, height: 30 }]}
                            source={require("../../../assets/buttons/check.png")}
                          />
                        </Pressable>
                        <Pressable>
                          <Image
                            style={[
                              { width: 20, height: 20, alignSelf: "center" },
                            ]}
                            source={require("../../../assets/buttons/close.png")}
                          />
                        </Pressable>
                      </View>
                    </LinearGradient>
                  ))}
                </View>
              </View>
            )
          )}
        </View>
      )}
      <LoadingOverlay isLoading={isLoading} />
    </View>
  );
};

export default FrieventRoomScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  tabsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: GlobalStyles.colors.primary500,
  },
  tabs: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  pressedTab: {
    backgroundColor: GlobalStyles.colors.primary100,
  },
  activeTab: {
    borderBottomColor: GlobalStyles.colors.primary500,
    borderBottomWidth: 4,
  },
  messengerWrapper: {
    flex: 1,
  },
  waitingWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
