import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native";
import { GlobalStyles } from "./constants/styles";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import { persistor, store } from "./store/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Navigation from "./navigation/Navigation";

if (__DEV__) {
  import("./reactotronConfig").then(() => console.log("Reactotron Configured"));
}

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    goldman: require("./assets/fonts/Goldman-Regular.ttf"),
    "goldman-bold": require("./assets/fonts/Goldman-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      (async () => await SplashScreen.hideAsync())();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
      <StatusBar style="dark" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
}
