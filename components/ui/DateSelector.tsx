import DatePicker from "./DatePicker";
import ToggleButton from "./buttons/ToggleButton";
import { StyleSheet, View } from "react-native";
import { addDays, DATE_LITERALS, toDateString } from "../../utils/DateUtil";

type DateSelectorProps = {
  value: Date;
  onChange: (item: any) => void;
};

const DateSelector = ({ value, onChange }: DateSelectorProps) => {
  const valueDate: string = toDateString(value.getTime());

  return (
    <View style={styles.wrapper}>
      <DatePicker value={value} onChange={onChange} />
      <ToggleButton
        pressed={valueDate === DATE_LITERALS.TODAY}
        onPress={() => onChange(new Date())}
      >
        Today
      </ToggleButton>
      <ToggleButton
        pressed={valueDate === DATE_LITERALS.TOMORROW}
        onPress={() => onChange(addDays(new Date(), 1))}
      >
        Tomorrow
      </ToggleButton>
    </View>
  );
};

export default DateSelector;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
