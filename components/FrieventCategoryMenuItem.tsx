import { Image, StyleSheet, Text, View } from "react-native";
import { FrieventCategory } from "../models/FrieventCategory";
import { GlobalStyles } from "../constants/styles";

const FrieventCategoryMenuItem = (props: {
  category: FrieventCategory;
  selected: boolean;
}) => {
  return (
    <View
      style={[
        props.selected ? styles.selectedSize : styles.size,
        styles.wrapper,
      ]}
    >
      <Image
        style={[props.selected ? styles.selectedSize : styles.size]}
        source={props.category.img}
      />
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{props.category.name}</Text>
      </View>
    </View>
  );
};

export default FrieventCategoryMenuItem;

const styles = StyleSheet.create({
  wrapper: {
    marginRight: 5,
    height: 150,
    justifyContent: "center",
  },
  size: {
    height: 130,
    width: 95,
  },
  selectedSize: {
    height: 150,
    width: 100,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
  },
  textWrapper: {
    zIndex: 10,
    position: "absolute",
    bottom: 20,
    width: "100%",
    backgroundColor: GlobalStyles.colors.primary400,
  },
});
