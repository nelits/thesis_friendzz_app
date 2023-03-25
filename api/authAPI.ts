import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseAuth } from "../firebaseConfig";

export const createUser = (email, password) => {
  return createUserWithEmailAndPassword(firebaseAuth, email, password);
};

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(firebaseAuth, email, password);
};
