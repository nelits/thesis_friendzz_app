import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GlobalStyles } from "../../constants/styles";

type ScrollPickerProps = {
  items: any[];
  value: any;
  onChange: (item: any) => void;
  horizontal?: boolean;
};

const screen = Dimensions.get("screen");

const ScrollPicker = ({
  items,
  value,
  onChange,
  horizontal,
}: ScrollPickerProps) => {
  const selectedIndexOffset = (items.indexOf(value) - 2) * (screen.width / 5);

  const renderItem = (item: any, idx: number) => {
    return (
      <Pressable
        onPress={() => onChange(item)}
        key={idx}
        style={[styles.itemWrapper, value === item && styles.selectedItem]}
      >
        <Text style={styles.item}>{item}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        contentOffset={{ x: selectedIndexOffset, y: 0 }}
        fadingEdgeLength={screen.width}
        contentContainerStyle={styles.scrollWrapper}
        horizontal={horizontal ?? true}
        showsHorizontalScrollIndicator={false}
      >
        {items.map((item, index) => renderItem(item, index))}
      </ScrollView>
    </View>
  );
};

export default ScrollPicker;

const styles = StyleSheet.create({
  wrapper: {
    height: 50,
    width: "100%",
  },
  scrollWrapper: {},
  itemWrapper: {
    width: screen.width / 5,
    justifyContent: "center",
  },
  item: {
    fontSize: 18,
    alignSelf: "center",
  },
  selectedItem: {
    borderColor: GlobalStyles.colors.primary500,
    borderWidth: 2,
  },
});
