import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

type SwipePageIndicatorProps = {
  totalPages: number;
  activePageIndex: number;
};

const SwipePageIndicator = ({
  totalPages,
  activePageIndex,
}: SwipePageIndicatorProps) => {
  return (
    <View style={styles.wrapper}>
      {[...Array(totalPages)].map((value, index) => {
        return (
          <View
            key={"SwipePageIndicator_" + index}
            style={[
              styles.indicator,
              index === activePageIndex && styles.currentIndicator,
            ]}
          />
        );
      })}
    </View>
  );
};

export default SwipePageIndicator;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary500,
    margin: 2,
  },
  currentIndicator: {
    backgroundColor: GlobalStyles.colors.primary500,
  },
});
