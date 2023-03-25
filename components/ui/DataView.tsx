import { View, Text } from "react-native";

type DataViewProps = {
  hasData: boolean;
  children: any;
};

const DataView = ({ hasData, children }: DataViewProps) => {
  return hasData ? (
    <>{children}</>
  ) : (
    <View style={{ flex: 1 }}>
      <Text>No Data Found</Text>
    </View>
  );
};

export default DataView;
