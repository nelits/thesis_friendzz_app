import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { FrieventCategory } from "../models/FrieventCategory";
import FrieventCategoryMenuItem from "./FrieventCategoryMenuItem";

type FrieventCategoriesMenuProps = {
  categories: FrieventCategory[];
  onChange: Function;
  value: string;
};

const FrieventCategoriesMenu = ({
  categories,
  onChange,
  value,
}: FrieventCategoriesMenuProps) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        contentContainerStyle={styles.scrollWrapper}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((c) => (
          <Pressable
            key={c.id}
            onPress={() => onChange(value === c.id ? null : c.id)}
          >
            <FrieventCategoryMenuItem category={c} selected={value === c.id} />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
  },
  scrollWrapper: {
    alignItems: "center",
  },
});

export default FrieventCategoriesMenu;
