import { Image, StyleSheet, Text, View } from "react-native";
import HobbyList from "../../../components/HobbyList";
import { GlobalStyles } from "../../../constants/styles";
import { useAppDispatch, useAppSelector } from "../../../store/redux/hooks";
import {
  addPhoto,
  currentUserSelector,
  loadingCurrentUser,
} from "../../../store/redux/accountSlice";
import ImageViewer from "../../../components/ui/ImageViewer";
import { addPhotoInUser } from "../../../api/userAPI";
import { getProfileSource } from "../../../utils/ImageUtils";
import LoadingOverlay from "../../../components/ui/LoadingOverlay";
import { ApiState } from "../../../store/redux/types";
import MoreOptionsMenu from "./MoreOptionsMenu";

const MyProfileScreen = () => {
  const currentUser = useAppSelector(currentUserSelector);
  const loadingUser = useAppSelector(loadingCurrentUser);

  const dispatch = useAppDispatch();

  return (
    <View style={styles.wrapper}>
      <View style={[styles.divider, styles.behindImage]}></View>
      <View style={styles.imageNameWrapper}>
        <Image
          style={[
            styles.profileImage,
            !currentUser.profileImg && styles.withoutUri,
          ]}
          source={getProfileSource(currentUser.profileImg)}
        />
        <Text style={styles.nameText} numberOfLines={1}>
          {currentUser.name}
        </Text>
      </View>
      <View>
        <Text
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
          numberOfLines={4}
        >
          {currentUser.description}
        </Text>
      </View>
      <View style={styles.divider}></View>
      <HobbyList hobbies={currentUser?.hobbies ?? []} />
      <View style={styles.divider}></View>
      <ImageViewer
        setDownloadURL={(imgURL) => {
          addPhotoInUser(currentUser.id, imgURL);
          dispatch(addPhoto(imgURL));
        }}
        canEdit={true}
        pathToUpload={"profile-photos/" + currentUser.id}
        images={currentUser.photos}
        userID={currentUser.id}
      />
      <MoreOptionsMenu />
      <LoadingOverlay isLoading={loadingUser === ApiState.pending} />
    </View>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingVertical: 10,
  },
  imageNameWrapper: {
    flexDirection: "row",
    paddingHorizontal: 20,
    alignContent: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  withoutUri: {
    backgroundColor: GlobalStyles.colors.white,
    borderColor: GlobalStyles.colors.primary500,
  },
  nameText: {
    flex: 1,
    fontSize: 30,
    fontWeight: "bold",
    color: GlobalStyles.colors.gray500,
    alignSelf: "center",
    marginStart: 20,
  },
  divider: {
    width: "100%",
    borderBottomWidth: 10,
    borderBottomColor: GlobalStyles.colors.primary400,
  },
  behindImage: {
    zIndex: -1,
    position: "absolute",
    top: 100,
  },
});
