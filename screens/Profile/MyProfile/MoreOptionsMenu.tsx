import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../../constants/styles";
import { useAppDispatch, useAppSelector } from "../../../store/redux/hooks";
import {
  currentUserSelector,
  isProfileHeaderMenuVisible,
  setCurrentUserDescription,
  setCurrentUserHobbies,
  setProfileMenuVisibility,
} from "../../../store/redux/accountSlice";
import Divider from "../../../components/ui/Divider";
import ImageUploader from "../../../components/ui/ImageUploader";
import { useState } from "react";
import LoadingOverlay from "../../../components/ui/LoadingOverlay";
import { updateUserInfo, updateUserProfileImg } from "../../../api/userAPI";
import { logOutUser } from "../../../store/redux/authSlice";
import ChangeDescriptionDialog from "./ChangeDescriptionDialog";
import EditHobbiesDialog from "./EditHobbiesDialog";
import { Hobby } from "../../../models/Hobby";

const MoreOptionsMenu = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDescriptionDialog, setShowDescriptionDialog] = useState(false);
  const [showEditHobbiesDialog, setShowEditHobbiesDialog] = useState(false);

  const dispatch = useAppDispatch();

  const visible = useAppSelector(isProfileHeaderMenuVisible);
  const currentUser = useAppSelector(currentUserSelector);

  const changeProfileImg = async (url: string) => {
    setIsLoading(true);
    await updateUserProfileImg(currentUser.id, url);
    setIsLoading(false);
    dispatch(setProfileMenuVisibility(false));
  };

  const changeProfileDescription = async (description: string) => {
    setShowDescriptionDialog(false);
    dispatch(setCurrentUserDescription(description));
    setIsLoading(true);
    await updateUserInfo(currentUser.id, { description: description });
    setIsLoading(false);
    dispatch(setProfileMenuVisibility(false));
  };

  const changeHobbies = async (hobbies: Hobby[]) => {
    setShowEditHobbiesDialog(false);
    dispatch(setCurrentUserHobbies({ hobbies: hobbies }));
    setIsLoading(true);
    await updateUserInfo(currentUser.id, { hobbies: hobbies.map((h) => h.id) });
    setIsLoading(false);
    dispatch(setProfileMenuVisibility(false));
  };

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.overlay}>
        <ChangeDescriptionDialog
          value={currentUser.description}
          showDialog={showDescriptionDialog}
          onCancel={() => setShowDescriptionDialog(false)}
          onSave={async (text) => changeProfileDescription(text)}
        />
        <EditHobbiesDialog
          value={currentUser.hobbies}
          showDialog={showEditHobbiesDialog}
          onCancel={() => setShowEditHobbiesDialog(false)}
          onSave={async (hobbies) => changeHobbies(hobbies)}
        />
        <Pressable
          style={{ flex: 1 }}
          onPress={() => dispatch(setProfileMenuVisibility(false))}
        />
        <View style={styles.menuWrapper}>
          <Pressable
            onPress={() => dispatch(logOutUser())}
            style={({ pressed }) => [pressed && styles.optionPressed]}
          >
            <Text style={styles.optionText}>Log Out</Text>
          </Pressable>
          <Divider />
          <ImageUploader
            setDownloadURL={(url) => changeProfileImg(url)}
            pathToUpload={"profile-photos/" + currentUser.id}
            fileName={"profile"}
            setIsUploading={setIsLoading}
            pressedStyle={styles.optionPressed}
          >
            <Text style={styles.optionText}>Change profile picture</Text>
          </ImageUploader>
          <LoadingOverlay isLoading={isLoading} />
          <Divider />
          <Pressable
            onPress={() => setShowDescriptionDialog(true)}
            style={({ pressed }) => [pressed && styles.optionPressed]}
          >
            <Text style={styles.optionText}>Add/Change description</Text>
          </Pressable>
          <Divider />
          <Pressable
            onPress={() => setShowEditHobbiesDialog(true)}
            style={({ pressed }) => [pressed && styles.optionPressed]}
          >
            <Text style={styles.optionText}>Edit Hobbies</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default MoreOptionsMenu;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.gray50,
    justifyContent: "flex-end",
  },
  menuWrapper: {
    paddingVertical: 10,
    width: "100%",
    backgroundColor: GlobalStyles.colors.white,
    alignItems: "center",
    alignSelf: "center",
  },
  optionText: {
    paddingVertical: 10,
  },
  optionPressed: {
    backgroundColor: GlobalStyles.colors.primary100,
    width: "100%",
    alignItems: "center",
  },
});
