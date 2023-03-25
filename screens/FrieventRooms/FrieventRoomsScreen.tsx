import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import FrieventRoomItem from "../../components/FrieventRoomItem";
import { useEffect, useState } from "react";
import { onSnapshot, query, where } from "firebase/firestore";
import {
  frieventsDocReference,
  getFrieventWithUsersInfo,
} from "../../api/frieventsAPI";
import { Frievent } from "../../models/Frievent";
import { FbFrievent } from "../../models/firebase/firebaseModels";
import { useAppSelector } from "../../store/redux/hooks";
import { currentUserIDSelector } from "../../store/redux/accountSlice";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import DataView from "../../components/ui/DataView";
import { FrieventStatus } from "./FrieventRoom/constants";
import { QueryDocumentSnapshot } from "@firebase/firestore";
import TitleWithLine from "../../components/ui/TitleWithLine";
import { GlobalStyles } from "../../constants/styles";
import Button from "../../components/ui/buttons/Button";

const screen = Dimensions.get("screen");

const FrieventRoomsScreen = ({ navigation }) => {
  const [frievents, setFrievents] = useState<Frievent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentUserID = useAppSelector(currentUserIDSelector);

  useEffect(() => {
    const q = query(
      frieventsDocReference,
      where("usersInvolvedIDs", "array-contains", currentUserID)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const frieventDocs: QueryDocumentSnapshot[] = [];

      querySnapshot.forEach((doc) => {
        frieventDocs.push(doc);
      });

      (async () => {
        await Promise.all(
          frieventDocs.map(async (doc) => {
            return await getFrieventWithUsersInfo(
              doc.data() as FbFrievent,
              doc.id
            );
          })
        ).then((frievents) => {
          setFrievents(frievents);
          setIsLoading(false);
        });
      })();
    });

    return () => unsubscribe();
  }, []);

  const getFrieventStatus = (frievent: Frievent): FrieventStatus => {
    if (
      frievent.creator.id === currentUserID ||
      frievent.usersAttending.findIndex((user) => user.id === currentUserID) !==
        -1
    ) {
      return FrieventStatus.Active;
    }

    if (
      frievent.usersWaiting.findIndex((user) => user.id === currentUserID) !==
      -1
    ) {
      return FrieventStatus.Pending;
    }

    return FrieventStatus.Closed;
  };

  const onPressFrieventHandler = (frievent: Frievent) => {
    const status = getFrieventStatus(frievent);

    if (status === FrieventStatus.Active) {
      navigation.navigate("FrieventRoom", { frieventID: frievent.id });
    }

    if (status === FrieventStatus.Pending) {
      navigation.navigate("FrieventOverview", { frieventID: frievent.id });
    }

    return null;
  };

  return (
    <View style={styles.wrapper}>
      <DataView hasData={frievents.length > 0}>
        <TitleWithLine color={GlobalStyles.colors.gray100}>
          Created by you
        </TitleWithLine>
        {frievents.findIndex((f) => f.creator.id === currentUserID) === -1 ? (
          <Button
            title="Create a frievent"
            onPress={() =>
              navigation.push("CreateFrieventScreen", { goBack: true })
            }
          />
        ) : null}
        {frievents
          .filter((f) => f.creator.id === currentUserID)
          .map((frievent) => (
            <Pressable
              key={frievent.id}
              onPress={() => onPressFrieventHandler(frievent)}
              style={styles.roomItemWrapper}
            >
              <FrieventRoomItem
                frievent={frievent}
                status={getFrieventStatus(frievent)}
              />
            </Pressable>
          ))}
        <TitleWithLine color={GlobalStyles.colors.gray100}>
          Created by others
        </TitleWithLine>
        {frievents
          .filter((f) => f.creator.id !== currentUserID)
          .map((frievent) => (
            <Pressable
              key={frievent.id}
              onPress={() => onPressFrieventHandler(frievent)}
              style={styles.roomItemWrapper}
            >
              <FrieventRoomItem
                frievent={frievent}
                status={getFrieventStatus(frievent)}
              />
            </Pressable>
          ))}
      </DataView>
      <LoadingOverlay isLoading={isLoading} />
    </View>
  );
};

export default FrieventRoomsScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  roomItemWrapper: {
    paddingBottom: 10,
    width: (screen.width - 40) / 2,
    height: (screen.width - 60) / 2,
  },
});
