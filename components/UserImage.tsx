import { Image, StyleSheet, Text, Pressable } from "react-native";
import { GlobalStyles } from "../constants/styles";

type UserImageProps = {
  imageURI: string;
  username: string;
  width: number;
  onPress: () => void;
};

const UserImage = ({ imageURI, username, width, onPress }: UserImageProps) => {
  return (
    <Pressable onPress={onPress} style={[styles.wrapper, { width: width }]}>
      <Image
        style={[styles.image, { width: width / 2, height: width / 2 }]}
        source={{ uri: imageURI }}
      />
      <Text style={styles.text} numberOfLines={1}>
        {username}
      </Text>
    </Pressable>
  );
};

export default UserImage;

const styles = StyleSheet.create({
  wrapper: {
    padding: 5,
    justifyContent: "center",
  },
  image: {
    alignSelf: "center",
    borderRadius: 50,
  },
  text: {
    alignSelf: "center",
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});
