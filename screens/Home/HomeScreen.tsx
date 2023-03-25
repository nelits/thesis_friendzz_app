import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";
import { FRIEVENT_CATEGORIES } from "../../data/dummy_data";
import FrieventListItem from "../../components/FrieventListItem";
import { Frievent } from "../../models/Frievent";
import FrieventCategoriesMenu from "../../components/FrieventCategoriesMenu";
import { GlobalStyles } from "../../constants/styles";
import { useEffect, useState } from "react";
import LocationSearch from "../../components/location-search/LocationSearch";
import { Place } from "../../models/Place";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import {
  filterFrieventsByCategoryAndPlace,
  loadFrievents,
  loadingFrievents,
  setFrievents,
} from "../../store/redux/frieventsSlice";
import { ApiState } from "../../store/redux/types";
import { onSnapshot, orderBy, query } from "firebase/firestore";
import {
  frieventsDocReference,
  getFrieventWithUsersInfo,
} from "../../api/frieventsAPI";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { FbFrievent } from "../../models/firebase/firebaseModels";
import {
  currentUserIDSelector,
  loadingCurrentUser,
} from "../../store/redux/accountSlice";
import { QueryDocumentSnapshot } from "@firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState<Place>();
  const [isLoading, setIsLoading] = useState(true);

  const currentUserID = useAppSelector(currentUserIDSelector);
  const frieventsList = useAppSelector(
    filterFrieventsByCategoryAndPlace(
      selectedCategory,
      selectedPlace?.description
    )
  );
  const frieventsLoading = useAppSelector(loadingFrievents);
  const loadingUser = useAppSelector(loadingCurrentUser);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const q = query(frieventsDocReference, orderBy("date"));
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
          dispatch(setFrievents(frievents));
          setIsLoading(false);
        });
      })();
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (frieventsLoading === ApiState.idle) {
      dispatch(loadFrievents());
    }
  }, [frieventsLoading]);

  const renderFrievent: ListRenderItem<Frievent> = (item) => {
    const pressCreatorImgHandler = () => {
      navigation.navigate("ViewProfile", { userID: item.item.creator.id });
    };

    const pressInfoHandler = () => {
      navigation.navigate("FrieventOverview", { frieventID: item.item.id });
    };

    const pressUsersListHandler = () => {
      navigation.navigate("UsersAttending", {
        frieventID: item.item.id,
      });
    };

    return (
      <FrieventListItem
        frievent={item.item}
        onPressCreatorImg={pressCreatorImgHandler}
        onPressInfo={pressInfoHandler}
        onPressUsersList={pressUsersListHandler}
      />
    );
  };

  const filterByCategory = (categoryID: string) => {
    setSelectedCategory(categoryID);
  };

  return (
    <View style={styles.container}>
      <LocationSearch onChange={setSelectedPlace} value={selectedPlace} />
      <FrieventCategoriesMenu
        onChange={filterByCategory}
        value={selectedCategory}
        categories={FRIEVENT_CATEGORIES}
      />
      <View style={styles.frieventsContainer}>
        {frieventsList.length === 0 ? <Text>No frievents found</Text> : null}
        <FlatList
          data={frieventsList.filter(
            (frievent) =>
              frievent.usersWaiting?.findIndex(
                (user) => user.id === frievent.creator.id
              ) === -1 && frievent.creator.id !== currentUserID
          )}
          keyExtractor={(item) => item.id}
          renderItem={renderFrievent}
        />
      </View>
      <LoadingOverlay
        isLoading={
          frieventsLoading !== ApiState.succeeded ||
          isLoading ||
          loadingUser === ApiState.pending
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.white,
    paddingVertical: 20,
    paddingBottom: 180,
  },
  frieventsContainer: {
    paddingLeft: 10,
    paddingVertical: 20,
  },
});
