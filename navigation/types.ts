import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type HomeStackParamList = {
  Home: undefined;
  FrieventOverview: { frieventID: string };
  ViewProfile: { frieventID: string };
  UsersAttending: { frieventID: string };
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, T>;

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};
