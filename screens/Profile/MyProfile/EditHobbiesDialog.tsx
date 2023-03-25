import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Dialog from "react-native-dialog";
import { GlobalStyles } from "../../../constants/styles";
import { HOBBIES } from "../../../data/dummy_hobbies";
import HobbyItem from "../../../components/HobbyItem";
import { Hobby } from "../../../models/Hobby";

type EditHobbiesDialogProps = {
  value: Hobby[];
  showDialog: boolean;
  onCancel: () => void;
  onSave: any;
};

const EditHobbiesDialog = ({
  onSave,
  onCancel,
  value,
  showDialog,
}: EditHobbiesDialogProps) => {
  const [hobbies, setHobbies] = useState(value);

  const onPressHobbyHandler = (selectedHobbies: Hobby[], newHobby: Hobby) => {
    const idx = selectedHobbies.findIndex((h) => h.id === newHobby.id);

    if (idx === -1) {
      setHobbies([...selectedHobbies, newHobby]);
    } else {
      setHobbies(selectedHobbies.filter((h) => h.id !== newHobby.id));
    }
  };

  return (
    <Dialog.Container visible={showDialog}>
      <Dialog.Title>Edit your hobbies</Dialog.Title>
      <View style={styles.hobbiesWrapper}>
        {HOBBIES.map((h) => (
          <Pressable onPress={() => onPressHobbyHandler(hobbies, h)} key={h.id}>
            <HobbyItem
              hobby={h}
              pressed={hobbies.findIndex((v) => v.id === h.id) !== -1}
            />
          </Pressable>
        ))}
      </View>
      <Dialog.Button
        label="Update"
        onPress={() => onSave(hobbies)}
        style={styles.updateBtn}
      />
      <Dialog.Button
        label="Cancel"
        onPress={onCancel}
        style={{ color: GlobalStyles.colors.primary500 }}
      />
    </Dialog.Container>
  );
};

export default EditHobbiesDialog;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  hobbiesWrapper: {
    flex: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "flex-start",
  },
  updateBtn: {
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary500,
    borderColor: GlobalStyles.colors.primary500,
    color: GlobalStyles.colors.white,
    borderWidth: 1,
    borderRadius: 2,
    padding: 10,
  },
});
