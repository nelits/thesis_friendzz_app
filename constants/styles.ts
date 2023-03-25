import { Platform, StatusBar } from "react-native";
import { Fonts } from "./fontNames";

export const GlobalStyles = {
  //todo fix colors
  colors: {
    primary50: "#f3e4d7",
    primary100: "#EA7F3232",
    primary200: "#EA7F3250",
    primary400: "#EA7F3270",
    primary500: "#EA7F32",
    primary700: "#2d0689",
    primary800: "#200364",
    accent500: "#f7bc0c",
    error50: "#fcc4e4",
    error500: "#a60f0f",
    gray50: "rgba(134,134,134,0.87)",
    gray100: "#8a8a8c",
    gray300: "#79797a",
    gray500: "#5b5b5d",
    gray700: "#221c30",
    white: "#fff",
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  logoText: {
    fontFamily: Fonts.GoldmanBold,
    color: "#EA7F32",
    alignSelf: "center",
  },
};
