import {
  Pressable,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from "react-native";
import { useController, UseControllerProps } from "react-hook-form";
import { GlobalStyles } from "../../../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

interface FormInputProps extends RNTextInputProps, UseControllerProps {
  label: string;
  name: string;
  icon?: any;
  defaultValue?: string;
  errorMessage?: string;
}

const FormInput = (props: FormInputProps) => {
  const {
    icon,
    name,
    label,
    rules,
    defaultValue,
    errorMessage,
    ...inputProps
  } = props;

  const { field } = useController({ name, rules, defaultValue });

  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputWrapper}>
        {icon ? (
          <Ionicons
            name={icon}
            size={15}
            color={GlobalStyles.colors.gray100}
            style={styles.icon}
          />
        ) : null}
        <RNTextInput
          style={styles.inputText}
          onBlur={field.onBlur}
          onChangeText={field.onChange}
          value={field.value}
          placeholder={label}
          {...inputProps}
          secureTextEntry={
            inputProps.secureTextEntry ? hidePassword : undefined
          }
        />
        {inputProps.secureTextEntry ? (
          <Pressable onPress={() => setHidePassword((prevState) => !prevState)}>
            <Ionicons
              name={hidePassword ? "eye-off" : "eye"}
              size={15}
              color={GlobalStyles.colors.gray100}
              style={styles.icon}
            />
          </Pressable>
        ) : null}
      </View>
      <View style={{ marginBottom: 5 }}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  wrapper: {},
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary500,
  },
  inputText: {
    flexGrow: 1,
    padding: 5,
  },
  icon: {
    paddingHorizontal: 10,
  },
  errorText: {
    color: GlobalStyles.colors.error500,
  },
});
