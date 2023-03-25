import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Dialog from "react-native-dialog";
import { GlobalStyles } from "../../../constants/styles";

type ChangeDescriptionDialogProps = {
  value: string;
  showDialog: boolean;
  onCancel: () => void;
  onSave: any;
};

const ChangeDescriptionDialog = ({
  onSave,
  onCancel,
  value,
  showDialog,
}: ChangeDescriptionDialogProps) => {
  const [description, setDescription] = useState(value);

  return (
    <Dialog.Container visible={showDialog}>
      <Dialog.Title>Add/Change profile description</Dialog.Title>
      <Dialog.Input onChangeText={(text) => setDescription(text)}>
        {description}
      </Dialog.Input>
      <Dialog.Button
        label="Update"
        onPress={() => onSave(description)}
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

export default ChangeDescriptionDialog;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
