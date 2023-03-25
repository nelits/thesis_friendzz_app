import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { Entypo, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { GOOGLE_PLACES_API_KEY } from "../../api/constants/googleCloudApiKey";
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  Place as GooglePlace,
} from "react-native-google-places-autocomplete";
import * as Location from "expo-location";
import { Place } from "../../models/Place";
import { PLACES } from "../../data/dummy_data";
import { LocationObject } from "expo-location/src/Location.types";
import { Overlay } from "@rneui/base";

Location.setGoogleApiKey(GOOGLE_PLACES_API_KEY);
Location.installWebGeolocationPolyfill();

const NEAR_ME_TEXT = "Near Me";

type LocationPickerOverlayProps = {
  value: Place;
  onChange: Function;
  hideSearchScreen: () => void;
  isSearchScreenVisible: boolean;
};

const LocationPickerOverlay = ({
  value,
  onChange,
  hideSearchScreen,
  isSearchScreenVisible,
}: LocationPickerOverlayProps) => {
  const recentPlaces: GooglePlace[] = PLACES.map((place) => {
    //todo add recent places from redux
    return {
      description: place.description,
      geometry: {
        location: {
          lat: place.latitude,
          lng: place.longitude,
        },
      },
    };
  });

  const [errorMsg, setErrorMsg] = useState(null);

  const nearMeHandler = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location: LocationObject = await Location.getCurrentPositionAsync({});
      onSelectPlace(
        NEAR_ME_TEXT,
        location.coords.longitude,
        location.coords.latitude
      );
    })();
  };

  const onSelectPlace = (
    placeDescription: string,
    longitude: number,
    latitude: number
  ) => {
    const selectedPlace: Place = {
      description: placeDescription,
      longitude,
      latitude,
    };

    onChange(selectedPlace);
    hideSearchScreen();
  };

  return (
    <Overlay isVisible={isSearchScreenVisible} overlayStyle={styles.wrapper}>
      <View style={{ flex: 1 }}>
        <GooglePlacesAutocomplete
          placeholder={value?.description ?? "Add a location..."}
          predefinedPlacesAlwaysVisible={false}
          predefinedPlaces={recentPlaces}
          onPress={(data: GooglePlaceData, detail: GooglePlaceDetail) => {
            onSelectPlace(
              data.description,
              detail.geometry.location.lng,
              detail.geometry.location.lat
            );
          }}
          query={{
            key: GOOGLE_PLACES_API_KEY,
            components: "country:gr",
            language: "en",
            types: "(cities)",
          }}
          renderRow={(data: GooglePlaceData, index) => {
            if (
              recentPlaces.findIndex(
                (place) => place.description == data.description
              ) !== -1
            ) {
              return (
                <View style={styles.locationWrapper}>
                  <Entypo name="back-in-time" size={18} />
                  <Text style={styles.locationText}>{data.description}</Text>
                </View>
              );
            }

            return (
              <View style={styles.locationWrapper}>
                <Text style={styles.locationText}>{data.description}</Text>
              </View>
            );
          }}
          fetchDetails={true}
          onFail={(error) => console.log(error)}
          onNotFound={() => console.log("no results")}
          listEmptyComponent={() => (
            <View style={{ flex: 1 }}>
              <Text>No results were found</Text>
            </View>
          )}
          listUnderlayColor={GlobalStyles.colors.primary100}
          listViewDisplayed={true}
          isRowScrollable={false}
          inbetweenCompo={
            <Pressable
              onPress={nearMeHandler}
              style={({ pressed }) => [
                styles.nearMeWrapper,
                styles.locationWrapper,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons name="location-outline" size={18} />
              <Text style={styles.locationText}>{NEAR_ME_TEXT}</Text>
            </Pressable>
          }
          filterReverseGeocodingByTypes={["locality"]}
          renderLeftButton={() => (
            <Pressable onPress={hideSearchScreen}>
              <Ionicons
                name="arrow-back-outline"
                size={25}
                color={GlobalStyles.colors.primary500}
              />
            </Pressable>
          )}
          styles={{
            textInput: styles.inputText,
            textInputContainer: styles.inputWrapper,
            container: {},
            description: {
              color: "#000",
              fontSize: 16,
            },
            predefinedPlacesDescription: {
              color: "#3caf50",
            },
            row: styles.locationWrapper,
          }}
          enablePoweredByContainer={false}
        />
      </View>
    </Overlay>
  );
};

export default LocationPickerOverlay;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.white,
    padding: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary500,
    paddingHorizontal: 10,
  },
  locationWrapper: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  locationText: {
    paddingLeft: 5,
  },
  nearMeWrapper: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: GlobalStyles.colors.primary500,
  },
  recentWrapper: {
    marginTop: 30,
  },
  inputText: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
  },
  pressed: {
    backgroundColor: GlobalStyles.colors.primary100,
  },
});
