import {
  arrayUnion,
  arrayRemove,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firebaseFirestore, firebaseStorage } from "../firebaseConfig";
import { User, UserFull } from "../models/User";
import {
  FbUserFull,
  FbUserInfo,
  fbUserToUserFull,
} from "../models/firebase/firebaseModels";
import { ref, deleteObject } from "firebase/storage";

export const getUserInfo = async (userId: string): Promise<UserFull> => {
  const usersDocReference = doc(firebaseFirestore, "users", userId);
  try {
    const userDoc = await getDoc(usersDocReference);
    const userData = userDoc.data();
    return fbUserToUserFull(userData as FbUserFull, userDoc.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getUserBasicInfo = async (
  userId: string
): Promise<{
  username: string;
  profileImg: string;
}> => {
  const usersBasicsDocReference = doc(
    firebaseFirestore,
    "users_basics",
    userId
  );
  try {
    return (await getDoc(usersBasicsDocReference)).data() as {
      username: string;
      profileImg: string;
    };
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const updateUserInfo = async (
  userId: string,
  data: Partial<FbUserInfo>
) => {
  const usersDocReference = doc(firebaseFirestore, "users", userId);
  try {
    await updateDoc(usersDocReference, { ...data });
    console.log("Document user updated with ID: ", userId);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const updateUserProfileImg = async (
  userId: string,
  profileImg: string
) => {
  const usersDocReference = doc(firebaseFirestore, "users", userId);
  const usersBasicsDocReference = doc(
    firebaseFirestore,
    "users_basics",
    userId
  );

  try {
    await updateDoc(usersDocReference, { profileImg: profileImg });
    await updateDoc(usersBasicsDocReference, { profileImg: profileImg });

    console.log("Document user updated with ID: ", userId);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const createUserInfo = async (user: User) => {
  const initialData: FbUserFull = {
    name: user.name,
    username: user.username,
    profileImg: user.profileImg,
    description: null,
    hobbies: [],
    photos: [],
  };

  const initialUserBasics = {
    username: user.username,
    profileImg: user.profileImg,
  };

  const usersDocReference = doc(firebaseFirestore, "users", user.id);
  const usersBasicsDocReference = doc(
    firebaseFirestore,
    "users_basics",
    user.id
  );
  try {
    await setDoc(usersDocReference, { ...initialData });
    await setDoc(usersBasicsDocReference, { ...initialUserBasics });
    console.log("Document user written with ID: ", user.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addPhotoInUser = async (userId: string, imgURL: string) => {
  const usersDocReference = doc(firebaseFirestore, "users/" + userId);
  try {
    await updateDoc(usersDocReference, {
      photos: arrayUnion(imgURL),
    });
    console.log("Document user updated with ID: ", userId);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const removePhotoFromUser = async (userId: string, imgURL: string) => {
  const usersDocReference = doc(firebaseFirestore, "users/" + userId);
  const photoReference = ref(firebaseStorage, imgURL);

  try {
    await updateDoc(usersDocReference, {
      photos: arrayRemove(imgURL),
    });

    await deleteObject(photoReference);

    console.log("Image deleted: ", userId);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
