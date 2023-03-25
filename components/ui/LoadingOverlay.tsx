import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

type LoadingOverlayProps = {
  isLoading: boolean;
};
const LoadingOverlay = ({ isLoading }: LoadingOverlayProps) => {
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color={GlobalStyles.colors.primary500}
        />
      </View>
    );
  }

  return null;
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalStyles.colors.white,
    opacity: 0.8,
  },
});
