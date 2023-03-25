import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useState } from "react";
import { GlobalStyles } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import ImageUploader from "./ImageUploader";
import LoadingOverlay from "./LoadingOverlay";
import { removePhotoFromUser } from "../../api/userAPI";

type ImageViewerProps = {
  images: any[];
  canEdit: boolean;
  pathToUpload: string;
  setDownloadURL: Function;
  userID?: string;
};

const ImageViewer = ({
  images,
  canEdit,
  pathToUpload,
  setDownloadURL,
  userID,
}: ImageViewerProps) => {
  const [imageSize, setImageSize] = useState({
    width: 100,
    height: 100,
  });
  const [isLoading, setIsLoading] = useState(false);

  const setImageDimensions = (layout) => {
    setImageSize({
      height: (layout.height - 20) / 3,
      width: (layout.width - 20) / 3,
    });
  };

  const onLongPressDelete = (imageURI) => {
    Alert.alert(
      null,
      "Are you sure you want to delete this photo?",
      [
        {
          text: "Delete",
          onPress: async () => removePhotoFromUser(userID, imageURI),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <View
      style={{ flex: 1 }}
      onLayout={(event) => setImageDimensions(event.nativeEvent.layout)}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          {images.length === 0 ? (
            <Text style={{ color: GlobalStyles.colors.gray50 }}>
              This user hasn't uploaded any photos yet :(
            </Text>
          ) : null}
          {images.map((image, index) => (
            <Pressable
              key={index}
              onLongPress={canEdit ? () => onLongPressDelete(image) : null}
            >
              <Image
                style={[imageSize, styles.image]}
                source={{ uri: image }}
              />
            </Pressable>
          ))}
          {canEdit && (
            <ImageUploader
              pathToUpload={pathToUpload}
              setDownloadURL={setDownloadURL}
              setIsUploading={setIsLoading}
            >
              <View
                style={[imageSize, styles.image, { justifyContent: "center" }]}
              >
                <Ionicons
                  style={{ alignSelf: "center" }}
                  name="add"
                  size={imageSize.width / 8}
                  color={GlobalStyles.colors.primary500}
                />
              </View>
              <LoadingOverlay isLoading={isLoading} />
            </ImageUploader>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ImageViewer;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 5,
    paddingRight: 0,
  },
  image: {
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary500,
    marginBottom: 5,
    marginRight: 5,
  },
});
