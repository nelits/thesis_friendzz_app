import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import FormInput from "../ui/controlled/FormInput";
import Button from "../ui/buttons/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { GlobalStyles } from "../../constants/styles";
import { AuthFormValues, AuthValues } from "./types";
import { get } from "lodash";

type AuthFormProps = {
  onSubmit: (data: AuthValues) => void;
  isSignIn?: boolean;
};

const signInSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

const signUpSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
  .required();

const AuthForm = ({ isSignIn, onSubmit }: AuthFormProps) => {
  const methods = useForm<AuthFormValues>({
    resolver: yupResolver(isSignIn ? signInSchema : signUpSchema),
  });

  const onSubmitForm: SubmitHandler<AuthFormValues> = (data) => {
    onSubmit(data);
  };

  const onError: SubmitErrorHandler<AuthFormValues> = (errors, e) => {
    return console.log(errors);
  };

  const getErrorMessage = (fieldName: string) => {
    return get(methods.formState.errors, fieldName + ".message");
  };

  return (
    <View style={styles.formWrapper}>
      <View style={styles.inputsWrapper}>
        <FormProvider {...methods}>
          <FormInput
            name="email"
            label="Email"
            icon="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            rules={{ required: "Email is required!" }}
            caretHidden={false}
            errorMessage={getErrorMessage("email")}
          />
          <FormInput
            name="password"
            label="Password"
            icon="lock-closed-outline"
            secureTextEntry
            rules={{ required: "Password is required!" }}
            errorMessage={getErrorMessage("password")}
          />
          {!isSignIn && (
            <FormInput
              name="repeatPassword"
              label="Repeat Password"
              icon="lock-closed-outline"
              secureTextEntry
              rules={{ required: "Password is required!" }}
              errorMessage={getErrorMessage("repeatPassword")}
            />
          )}
        </FormProvider>
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          title={isSignIn ? "Sign In" : "Create New Account"}
          onPress={methods.handleSubmit(onSubmitForm, onError)}
        />
        {isSignIn && (
          <Pressable style={{ marginTop: 10 }}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  formWrapper: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  inputsWrapper: {
    flex: 2,
    justifyContent: "space-evenly",
  },
  buttonWrapper: {
    flex: 1,
  },
  forgotText: {
    color: GlobalStyles.colors.gray100,
  },
});
