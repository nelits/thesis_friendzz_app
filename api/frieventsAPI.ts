import {
  FbFrievent,
  fbUserBasicToUserBasic,
} from "../models/firebase/firebaseModels";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firebaseFirestore } from "../firebaseConfig";
import { fbToFrieventModel, Frievent } from "../models/Frievent";
import { getUserBasicInfo } from "./userAPI";
import { QueryDocumentSnapshot } from "@firebase/firestore";

export const frieventsDocReference = collection(firebaseFirestore, "frievents");

export const createFrievent = async (frievent: FbFrievent) => {
  try {
    await addDoc(frieventsDocReference, frievent);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const updateFrievent = async (
  data: Partial<FbFrievent>,
  frieventID: string
) => {
  const frieventsDocReference = doc(firebaseFirestore, "frievents", frieventID);
  try {
    await updateDoc(frieventsDocReference, data);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addWaitingUser = async (userID: string, frieventID: string) => {
  const frieventsDocReference = doc(firebaseFirestore, "frievents", frieventID);
  try {
    await updateDoc(frieventsDocReference, {
      usersWaitingIDs: arrayUnion(userID),
      usersInvolvedIDs: arrayUnion(userID),
    } as { [x in keyof Pick<FbFrievent, "usersWaitingIDs" | "usersInvolvedIDs">]: any });
  } catch (e) {
    console.error("Error adding  document: ", e);
  }
};

export const addAttendingUser = async (userID: string, frieventID: string) => {
  const frieventsDocReference = doc(firebaseFirestore, "frievents", frieventID);
  try {
    await updateDoc(frieventsDocReference, {
      usersAttendingIDs: arrayUnion(userID),
      usersWaitingIDs: arrayRemove(userID),
    } as { [x in keyof Pick<FbFrievent, "usersWaitingIDs" | "usersAttendingIDs">]: any });
  } catch (e) {
    console.error("Error adding  document: ", e);
  }
};

export const getFrievents = async () => {
  const querySnapshot = await getDocs(frieventsDocReference);

  const frieventsDocs: QueryDocumentSnapshot[] = [];

  querySnapshot.forEach((doc) => {
    frieventsDocs.push(doc);
  });

  return await Promise.all(
    frieventsDocs.map(async (doc) => {
      return await getFrieventWithUsersInfo(doc.data() as FbFrievent, doc.id);
    })
  );
};

export const getFrieventWithUsersInfo = async (
  fbFrievent: FbFrievent,
  frieventID: string
): Promise<Frievent> => {
  try {
    return await Promise.all(
      fbFrievent.usersInvolvedIDs.map(async (userID) => {
        return await getUserBasicInfo(userID).then((user) =>
          fbUserBasicToUserBasic(user, userID)
        );
      })
    ).then((usersInvolved) =>
      fbToFrieventModel(fbFrievent, usersInvolved, frieventID)
    );
  } catch (e) {
    console.log("Error getFrievents: ", e);
  }
};
