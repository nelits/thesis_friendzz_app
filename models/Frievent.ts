import { User, UserBasic } from "./User";
import { FrieventCategory } from "./FrieventCategory";
import { Place } from "./Place";
import { FbFrievent } from "./firebase/firebaseModels";
import { FRIEVENT_CATEGORIES } from "../data/dummy_data";

export type Frievent = {
  id: string;
  category: FrieventCategory;
  place: Place;
  date: number;
  time: string;
  attendanceCapacity: number;
  usersAttending: UserBasic[];
  usersWaiting: UserBasic[];
  usersInvolvedIDs: string[];
  creator: UserBasic;
};

export type FrieventForm = {
  location: Place;
  categoryID: string;
  date: Date;
  time: string;
  persons: number;
};

export const formToFbModel = (
  formValues: FrieventForm,
  currentUser: User
): FbFrievent => {
  return {
    category: {
      id: formValues.categoryID,
      name: FRIEVENT_CATEGORIES.find((fc) => fc.id === formValues.categoryID)
        .name,
    },
    place: { ...formValues.location },
    date: formValues.date.getTime(),
    time: formValues.time,
    attendanceCapacity: formValues.persons,
    usersAttendingIDs: [],
    usersWaitingIDs: [],
    usersInvolvedIDs: [currentUser.id],
    creatorID: currentUser.id,
  };
};

export const fbToFrieventModel = (
  fbFrievent: FbFrievent,
  usersInvolved: UserBasic[],
  docID: string
): Frievent => {
  return {
    ...fbFrievent,
    id: docID,
    category: FRIEVENT_CATEGORIES.find(
      (fc) => fc.id === fbFrievent.category.id
    ),
    date: fbFrievent.date,
    usersWaiting: fbFrievent.usersWaitingIDs.map((userID) =>
      usersInvolved.find((ui) => ui.id === userID)
    ),
    usersAttending: fbFrievent.usersAttendingIDs.map((userID) =>
      usersInvolved.find((ui) => ui.id === userID)
    ),
    creator: usersInvolved.find((u) => u.id === fbFrievent.creatorID),
  };
};
