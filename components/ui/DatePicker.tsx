import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { addDays, formatDate } from "../../utils/DateUtil";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { DateFormats } from "../../constants/dateFormats";

type DatePickerProps = {
  value: Date;
  onChange: (selectedDate: Date) => void;
};

const today = new Date();
today.setHours(0, 0, 0, 0);

const initialDate = new Date(null);

const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const isInitialDate: boolean = value.getTime() === initialDate.getTime();

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);

    if (event.type === "set") {
      onChange(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={[styles.dateInput, isInitialDate ? null : styles.dateSelected]}
        onPress={showDatepicker}
      >
        <Text style={styles.dateText}>
          {isInitialDate
            ? "Select date"
            : formatDate(value, DateFormats["DD MMMM"])}
        </Text>
        <Ionicons
          name="calendar"
          size={20}
          color={GlobalStyles.colors.gray700}
        />
      </Pressable>

      {showDatePicker ? (
        <RNDateTimePicker
          placeholderText="Select date"
          textColor={GlobalStyles.colors.primary500}
          mode={"date"}
          value={value}
          onChange={onChangeDate}
          minimumDate={today}
          maximumDate={addDays(today, 6)}
        />
      ) : null}
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  wrapper: {},
  dateInput: {
    borderColor: GlobalStyles.colors.primary500,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  dateText: {
    color: GlobalStyles.colors.gray500,
    textAlign: "center",
    alignSelf: "center",
    paddingRight: 10,
  },
  dateSelected: {
    backgroundColor: GlobalStyles.colors.primary50,
  },
});
