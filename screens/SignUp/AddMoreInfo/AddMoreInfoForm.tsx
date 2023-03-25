import { Image, StyleSheet, Text, View } from "react-native";
import {
  Controller,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "../../../models/User";
import FormInput from "../../../components/ui/controlled/FormInput";
import Button from "../../../components/ui/buttons/Button";
import ImageUploader from "../../../components/ui/ImageUploader";
import { getAddImageSource } from "../../../utils/ImageUtils";
import { GlobalStyles } from "../../../constants/styles";
import { useState } from "react";
import LoadingOverlay from "../../../components/ui/LoadingOverlay";
import { get } from "lodash";

type MoreInfoFormProps = {
  onSubmit: (data: User) => void;
  userID: string;
};

const moreInfoFormSchema = yup
  .object({
    name: yup.string().required(),
    username: yup.string().min(6).required(),
    profileImg: yup.string().required(),
  })
  .required();

const AddMoreInfoForm = ({ userID, onSubmit }: MoreInfoFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<User>({
    resolver: yupResolver(moreInfoFormSchema),
    defaultValues: {
      id: userID,
      profileImg: null,
    },
  });

  const onSubmitForm: SubmitHandler<User> = (data) => {
    console.log(data);
    onSubmit(data);
  };

  const onError: SubmitErrorHandler<User> = (errors, e) => {
    return console.log(errors);
  };

  const getErrorMessage = (fieldName: string) => {
    return get(methods.formState.errors, fieldName + ".message");
  };

  return (
    <View style={styles.formWrapper}>
      <FormProvider {...methods}>
        <FormInput
          name="name"
          label="Your Name"
          rules={{ required: "Your name is required!" }}
          errorMessage={getErrorMessage("name")}
        />
        <FormInput
          name="username"
          label="Username"
          autoCapitalize="none"
          autoCorrect={false}
          rules={{ required: "Username is required!" }}
          errorMessage={getErrorMessage("username")}
        />
      </FormProvider>
      <Controller
        control={methods.control}
        name={"profileImg"}
        render={({ field }) => (
          <ImageUploader
            setDownloadURL={field.onChange}
            pathToUpload={"profile-photos/" + userID}
            fileName={"profile"}
            setIsUploading={setIsLoading}
          >
            <View
              style={{
                height: 150,
                padding: 5,
                borderWidth: 1,
                borderColor: GlobalStyles.colors.primary500,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: GlobalStyles.colors.gray100 }}>
                Press here to upload a profile photo
              </Text>
              <Image
                style={{ width: 100, height: 100 }}
                source={getAddImageSource(field.value)}
              />
              <LoadingOverlay isLoading={isLoading} />
            </View>
          </ImageUploader>
        )}
      />
      <Button
        title={"Save"}
        onPress={methods.handleSubmit(onSubmitForm, onError)}
      />
    </View>
  );
};

export default AddMoreInfoForm;

const styles = StyleSheet.create({
  formWrapper: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  inputsWrapper: {
    flex: 2,
    justifyContent: "space-evenly",
  },
});
