import { Hobby } from "./Hobby";
import { FbUser } from "./firebase/firebaseModels";

export type User = {
  id: string;
  name: string;
  username: string;
  profileImg: string;
};

export type UserBasic = {
  id: string;
  username: string;
  profileImg: string;
};

export type UserInfo = {
  description: string;
  hobbies: Hobby[];
  photos: string[];
};

export type UserFull = User & UserInfo;

export const toUser = (fbUser: FbUser): User => {
  return {
    id: fbUser.localId,
    name: fbUser.displayName,
    username: "",
    profileImg: fbUser.photoUrl,
  };
};
