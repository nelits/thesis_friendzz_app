import { Image, StyleSheet, Text, View } from "react-native";
import HobbyList from "../../components/HobbyList";
import { GlobalStyles } from "../../constants/styles";
import { UserFull } from "../../models/User";
import { useEffect, useState } from "react";
import ImageViewer from "../../components/ui/ImageViewer";
import { addPhotoInUser, getUserInfo } from "../../api/userAPI";
import { getProfileSource } from "../../utils/ImageUtils";
import LoadingOverlay from "../../components/ui/LoadingOverlay";

const ViewProfileScreen = ({ route, navigation }) => {
  const [profileUser, setProfileUser] = useState<UserFull>();
  const [isLoading, setIsLoading] = useState(true);

  const profileID = route.params.userID;

  useEffect(() => {
    getUserInfo(profileID).then((user) => {
      setProfileUser(user);
      navigation.setOptions({ title: user.username });
      setIsLoading(false);
    });

    // const unsubscribe = onSnapshot(
    //   doc(firebaseFirestore, "users", profileID),
    //   (documentSnapshot) => {
    //     setProfileUser(fbUserToUserFull(documentSnapshot.data() as FbUserFull));
    //   }
    // );
    //
    // return () => unsubscribe();
  }, [route.params.userID]);

  if (isLoading) {
    return <LoadingOverlay isLoading={isLoading} />;
  }

  return (
    <View style={styles.wrapper}>
      <View style={[styles.divider, styles.behindImage]}></View>
      <View style={styles.imageNameWrapper}>
        <Image
          style={[
            styles.profileImage,
            !profileUser.profileImg && styles.withoutUri,
          ]}
          source={getProfileSource(profileUser.profileImg)}
        />
        <Text style={styles.nameText} numberOfLines={1}>
          {profileUser.name}
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
          {profileUser.description}
        </Text>
      </View>
      <View style={styles.divider}></View>
      <HobbyList hobbies={profileUser?.hobbies ?? []} />
      <View style={styles.divider}></View>
      <ImageViewer
        setDownloadURL={(imgURL) => addPhotoInUser(profileUser.id, imgURL)}
        canEdit={false}
        pathToUpload={"profile-photos/" + profileUser.id}
        images={profileUser.photos}
      />
    </View>
  );
};

export default ViewProfileScreen;

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
