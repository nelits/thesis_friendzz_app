import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/styles";
import { Place } from "../../models/Place";
import { useState } from "react";
import LocationPickerOverlay from "./LocationPickerOverlay";

type LocationSearchProps = {
  onChange: Function;
  value: Place;
};

const LocationSearch = ({ value, onChange }: LocationSearchProps) => {
  const [showSearchScreen, setShowSearchScreen] = useState<boolean>(false);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingEnd: 20,
      }}
    >
      <Pressable style={{ flex: 1 }} onPress={() => setShowSearchScreen(true)}>
        <View style={styles.wrapper}>
          <Ionicons name="search" size={18} />
          <Text style={[styles.text, !value && styles.initialText]}>
            {value?.description ?? "Where you wanna go?"}
          </Text>
        </View>
      </Pressable>
      {value ? (
        <Pressable
          style={({ pressed }) => [
            pressed && { backgroundColor: GlobalStyles.colors.primary50 },
            { alignSelf: "center" },
          ]}
          onPress={() => onChange(undefined)}
        >
          <Ionicons name="close" size={18} />
        </Pressable>
      ) : null}

      <LocationPickerOverlay
        hideSearchScreen={() => setShowSearchScreen(false)}
        isSearchScreenVisible={showSearchScreen}
        onChange={onChange}
        value={value}
      />
    </View>
  );
};

export default LocationSearch;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderColor: GlobalStyles.colors.primary500,
    borderWidth: 1,
    backgroundColor: GlobalStyles.colors.white,
  },
  text: {
    paddingLeft: 10,
  },
  initialText: {
    color: GlobalStyles.colors.gray100,
  },
});
