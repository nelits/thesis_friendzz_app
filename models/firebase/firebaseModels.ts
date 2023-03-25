import { UserBasic, UserFull } from "../User";
import { Place } from "../Place";
import { HOBBIES } from "../../data/dummy_hobbies";

export type FbUser = {
  localId: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  photoUrl: string;
};

export type FbUserBasic = {
  username: string;
  profileImg: string;
};

export type FbFrievent = {
  category: {
    id: string;
    name: string;
  };
  place: Place;
  date: number;
  time: string;
  attendanceCapacity: number;
  usersAttendingIDs: string[];
  usersWaitingIDs: string[];
  usersInvolvedIDs: string[];
  creatorID: string;
};

export type FbUserInfo = {
  description: string;
  hobbies: string[];
  photos: string[];
};

export type FbUserFull = {
  name: string;
  username: string;
  profileImg: string;
  description: string;
  hobbies: string[];
  photos: string[];
};

export const fbUserToUserFull = (
  fbUser: FbUserFull,
  userID: string
): UserFull => {
  return {
    ...fbUser,
    id: userID,
    hobbies: fbUser.hobbies.map((userHobby) =>
      HOBBIES.find((hobby) => hobby.id === userHobby)
    ),
  };
};

export const fbUserBasicToUserBasic = (
  fbUserBasic: FbUserBasic,
  userID: string
): UserBasic => {
  return {
    id: userID,
    ...fbUserBasic,
  };
};
