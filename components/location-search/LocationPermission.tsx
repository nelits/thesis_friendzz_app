/*
import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";

import * as Location from "expo-location";
import { API_KEY } from "../api/constants/googleCloudApiKey";

Location.setGoogleApiKey(API_KEY);
Location.installWebGeolocationPolyfill();
Location.enableNetworkProviderAsync();

const LocationPermission = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return <View />;
};

export default LocationPermission;
*/
