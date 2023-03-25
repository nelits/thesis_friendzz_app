import { getDownloadURL, ref } from "firebase/storage";
import { firebaseStorage } from "../firebaseConfig";

export const getProfileImgURL = async (userID: string) => {
  const fileRef = ref(
    firebaseStorage,
    "/profile-photos/" + userID + "/profile"
  );
  try {
    return await getDownloadURL(fileRef);
  } catch (e) {
    console.log("Error downloading url from firestore ", fileRef.fullPath);
  }
};
