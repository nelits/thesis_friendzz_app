import { Pressable } from "react-native";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseStorage } from "../../firebaseConfig";
import * as ImPi from "expo-image-picker";

type ImageUploaderProps = {
  children: any;
  pathToUpload: string;
  setDownloadURL?: Function;
  setIsUploading?: (uploading: boolean) => void;
  fileName?: string;
  pressedStyle?: any;
};

const ImageUploader = ({
  children,
  pathToUpload,
  setDownloadURL,
  setIsUploading,
  fileName,
  pressedStyle,
}: ImageUploaderProps) => {
  const pickImage = async () => {
    const result: ImPi.ImagePickerResult = await ImPi.launchImageLibraryAsync({
      mediaTypes: ImPi.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setIsUploading && setIsUploading(true);
      try {
        await uploadImageAsync((result as ImPi.ImageInfo).uri);
      } catch (e) {
        console.log(e);
      }

      setIsUploading && setIsUploading(false);
    }
  };

  const uploadImageAsync = async (uri: string) => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob: any = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(
      firebaseStorage,
      pathToUpload + "/" + (fileName ?? new Date().getTime().toString())
    );
    await uploadBytes(fileRef, blob);
    blob.close();

    const url = await getDownloadURL(fileRef);
    setDownloadURL && setDownloadURL(url);
  };

  return (
    <Pressable
      onPress={pickImage}
      style={({ pressed }) => [pressed && pressedStyle]}
    >
      {children}
    </Pressable>
  );
};

export default ImageUploader;
